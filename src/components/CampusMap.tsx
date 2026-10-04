import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Ecole } from '../types';
import { schoolHref } from '../utils/router';

interface CampusMapProps {
  schools: Ecole[];
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Carte des campus géolocalisés (tuiles OpenStreetMap). Chargée à la demande : Leaflet n'alourdit pas le reste du site.
const CampusMap: React.FC<CampusMapProps> = ({ schools }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const map = L.map(containerRef.current, { scrollWheelZoom: false }).setView([46.6, 2.4], 5);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    mapRef.current = map;
    layerRef.current = L.layerGroup().addTo(map);
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!map || !layer) return;
    layer.clearLayers();
    const points: L.LatLngExpression[] = [];

    for (const ecole of schools) {
      const isPrepa = ecole.type_etablissement === 'prepa_cpge';
      for (const campus of ecole.campus) {
        if (campus.latitude == null || campus.longitude == null) continue;
        const pos: L.LatLngExpression = [campus.latitude, campus.longitude];
        points.push(pos);
        L.circleMarker(pos, {
          radius: campus.est_siege_principal ? 7 : 5,
          color: '#fff',
          weight: 1.5,
          fillColor: isPrepa ? '#d97706' : '#4f46e5',
          fillOpacity: 0.9,
        })
          .bindPopup(
            `<strong>${esc(ecole.nom_officiel)}</strong><br>${esc(campus.nom_campus)} · ${esc(campus.ville)}<br>` +
            `<a href="${schoolHref(ecole.id)}">Voir la fiche →</a>`
          )
          .addTo(layer);
      }
    }
    if (points.length) map.fitBounds(L.latLngBounds(points), { padding: [24, 24], maxZoom: 11 });
  }, [schools]);

  const located = schools.filter(e => e.campus.some(c => c.latitude != null && c.longitude != null)).length;

  return (
    <div className="space-y-2">
      <div
        ref={containerRef}
        role="region"
        aria-label="Carte des campus"
        className="h-[60vh] min-h-80 w-full rounded-xl border border-slate-200 overflow-hidden z-0"
      />
      <p className="text-[11px] text-slate-500">
        {located} établissement(s) géolocalisé(s) sur {schools.length}
        {located < schools.length && ' — les autres n’ont pas encore de coordonnées.'}
      </p>
    </div>
  );
};

export default CampusMap;
