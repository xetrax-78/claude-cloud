"""
=============================================================================
INGÉFINDER DATA PIPELINE - MODULE FETCHER ASYNCHRONE & ANTI-BOT
=============================================================================
Auteur : Senior Data Engineering & Web Scraping Architect
Rôle   : Récupération réseau haute performance, rotation des empreintes HTTP,
         gestion du rate-limiting et résilience aux statuts 429/503.
=============================================================================
"""

import asyncio
import logging
import random
import sys
import time
from typing import Any, Dict, List, Optional, Tuple, Union

try:
    import httpx
    HAS_HTTPX = True
except ImportError:
    HAS_HTTPX = False

import urllib.request
import urllib.parse
import json

logger = logging.getLogger("Fetcher")

# ---------------------------------------------------------------------------
# POOL D'USER-AGENTS RÉELS ET RÉCENTS (CHROME, SAFARI, EDGE, FIREFOX)
# ---------------------------------------------------------------------------
USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_4_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Safari/605.1.15",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 Edg/123.0.0.0"
]

DEFAULT_HEADERS = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
    "Accept-Encoding": "gzip, deflate, br",
    "DNT": "1",
    "Connection": "keep-alive",
    "Upgrade-Insecure-Requests": "1",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1"
}


# ---------------------------------------------------------------------------
# RATE LIMITER AVEC JETONS (TOKEN BUCKET / SEMAPHORE)
# ---------------------------------------------------------------------------
class AsyncRateLimiter:
    """Régulateur de débit par domaine pour respecter l'éthique de crawling."""

    def __init__(self, requests_per_second: float = 3.0):
        self.delay = 1.0 / max(requests_per_second, 0.1)
        self.lock = asyncio.Lock()
        self.last_call = 0.0

    async def wait(self):
        async with self.lock:
            now = time.monotonic()
            elapsed = now - self.last_call
            if elapsed < self.delay:
                sleep_time = self.delay - elapsed + random.uniform(0.05, 0.2)
                await asyncio.sleep(sleep_time)
            self.last_call = time.monotonic()


# ---------------------------------------------------------------------------
# CLASSE PRINCIPALE : ASYNC FETCHER
# ---------------------------------------------------------------------------
class AsyncFetcher:
    """
    Client de téléchargement HTTP asynchrone avec :
    - Rotation automatique d'User-Agent
    - Rate-limiting par domaine
    - Retry exponentiel avec gigue (jitter) en cas de 429 (Too Many Requests) ou 503
    - Support Playwright optionnel pour les pages JavaScript dynamiques
    """

    def __init__(
        self,
        max_concurrent_requests: int = 5,
        requests_per_second: float = 2.5,
        max_retries: int = 4,
        timeout: float = 20.0
    ):
        self.semaphore = asyncio.Semaphore(max_concurrent_requests)
        self.rate_limiter = AsyncRateLimiter(requests_per_second)
        self.max_retries = max_retries
        self.timeout = timeout

    def _get_random_headers(self, custom_headers: Optional[Dict[str, str]] = None) -> Dict[str, str]:
        headers = DEFAULT_HEADERS.copy()
        headers["User-Agent"] = random.choice(USER_AGENTS)
        if custom_headers:
            headers.update(custom_headers)
        return headers

    async def fetch_url(
        self,
        url: str,
        params: Optional[Dict[str, Any]] = None,
        headers: Optional[Dict[str, str]] = None,
        as_json: bool = False
    ) -> Tuple[Optional[Union[str, Dict[str, Any]]], int]:
        """
        Télécharge une URL de manière asynchrone et résiliente.
        Retourne (contenu, status_code).
        """
        await self.rate_limiter.wait()
        req_headers = self._get_random_headers(headers)

        async with self.semaphore:
            for attempt in range(1, self.max_retries + 1):
                try:
                    if HAS_HTTPX:
                        async with httpx.AsyncClient(
                            timeout=self.timeout,
                            follow_redirects=True,
                            verify=False
                        ) as client:
                            response = await client.get(url, params=params, headers=req_headers)
                            status = response.status_code

                            if status == 200:
                                return (response.json() if as_json else response.text), status

                            elif status in (429, 503, 504):
                                backoff = (2 ** attempt) + random.uniform(0.5, 2.0)
                                logger.warning(
                                    "[Retry %d/%d] Statut %d sur %s - Attente de %.1fs",
                                    attempt, self.max_retries, status, url, backoff
                                )
                                await asyncio.sleep(backoff)
                            else:
                                logger.error("Erreur HTTP %d lors de la requête vers %s", status, url)
                                return None, status

                    else:
                        # Fallback standard library (sans dépendance externe)
                        loop = asyncio.get_running_loop()
                        return await loop.run_in_executor(
                            None, self._sync_urllib_fetch, url, params, req_headers, as_json
                        )

                except Exception as exc:
                    backoff = (1.5 ** attempt) + random.uniform(0.2, 1.0)
                    logger.warning("[Tentative %d/%d] Exception %s sur %s - Attente %.1fs", attempt, self.max_retries, str(exc), url, backoff)
                    await asyncio.sleep(backoff)

            logger.error("Échec définitif du fetch après %d tentatives : %s", self.max_retries, url)
            return None, 0

    def _sync_urllib_fetch(
        self,
        url: str,
        params: Optional[Dict[str, Any]],
        headers: Dict[str, str],
        as_json: bool
    ) -> Tuple[Optional[Union[str, Dict[str, Any]]], int]:
        """Méthode synchrone urllib pour compatibilité universelle."""
        try:
            full_url = url
            if params:
                query = urllib.parse.urlencode(params)
                full_url = f"{url}?{query}"
            
            req = urllib.request.Request(full_url, headers=headers)
            with urllib.request.urlopen(req, timeout=self.timeout) as resp:
                status = resp.status
                raw_bytes = resp.read()
                text = raw_bytes.decode("utf-8", errors="replace")
                if as_json:
                    return json.loads(text), status
                return text, status
        except urllib.error.HTTPError as e:
            return None, e.code
        except Exception:
            return None, 0

    async def fetch_with_playwright(self, url: str, wait_selector: Optional[str] = None) -> Optional[str]:
        """
        Hook Playwright pour les pages à rendu JavaScript lourd (SPA, cartes dynamiques Parcoursup).
        Utilise un fallback propre si Playwright n'est pas installé dans le conteneur.
        """
        try:
            from playwright.async_api import async_playwright
            async with async_playwright() as p:
                browser = await p.chromium.launch(headless=True)
                page = await browser.new_page(user_agent=random.choice(USER_AGENTS))
                await page.goto(url, wait_until="networkidle", timeout=30000)
                if wait_selector:
                    await page.wait_for_selector(wait_selector, timeout=10000)
                content = await page.content()
                await browser.close()
                return content
        except ImportError:
            logger.debug("Playwright non installé dans l'environnement, utilisation du fetch HTTP direct.")
            content, _ = await self.fetch_url(url)
            return content if isinstance(content, str) else None
        except Exception as e:
            logger.warning("Échec du rendu Playwright pour %s: %s", url, str(e))
            content, _ = await self.fetch_url(url)
            return content if isinstance(content, str) else None
