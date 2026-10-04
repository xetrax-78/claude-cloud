import React from 'react';

const RELOAD_KEY = 'ingefinder.chunk-reload';

// Après une mise en ligne, les anciens fichiers JS n'existent plus : un rechargement récupère la nouvelle version
export const isChunkLoadError = (error: unknown) =>
  error instanceof Error &&
  /dynamically imported module|Importing a module script failed|Failed to fetch|error loading dynamically/i.test(error.message);

/** Recharge la page une seule fois par session pour une erreur de chargement de module. */
export function reloadOnceForChunkError(error: unknown): boolean {
  if (!isChunkLoadError(error)) return false;
  try {
    if (sessionStorage.getItem(RELOAD_KEY)) return false;
    sessionStorage.setItem(RELOAD_KEY, '1');
  } catch {
    return false;
  }
  window.location.reload();
  return true;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends React.Component<{ children: React.ReactNode; resetKey?: string }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error) {
    if (!reloadOnceForChunkError(error)) console.error(error);
  }

  componentDidUpdate(prev: { resetKey?: string }) {
    // Changer de page efface l'erreur affichée
    if (this.state.error && prev.resetKey !== this.props.resetKey) this.setState({ error: null });
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div role="alert" className="py-24 text-center space-y-3">
        <p className="text-slate-800 font-semibold">Un problème est survenu en affichant cette page.</p>
        <button
          onClick={() => window.location.reload()}
          className="text-sm font-semibold text-indigo-600 hover:underline"
        >
          Recharger la page
        </button>
      </div>
    );
  }
}
