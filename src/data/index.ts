import { Ecole } from '../types';
import { ALL_ESTABLISHMENTS as BASE_ESTABLISHMENTS } from './establishmentEnrichment';
import { applyUpdates, ParcoursupUpdatesFile, PipelineUpdatesFile } from './applyUpdates';
import parcoursupUpdates from './updates/parcoursup.json';
import pipelineUpdates from './updates/pipeline.json';

export {
  ENRICHED_SCHOOLS,
  ENRICHED_PREPAS,
  enrichSchool,
  enrichPrepa
} from './establishmentEnrichment';

export { SCHOOLS_DATA } from './schoolsData';
export { PREPAS_DATA } from './prepasData';

// Jeu de base + mises à jour générées par les scripts Python (src/data/updates/*.json, format non vérifié par tsc)
export const ALL_ESTABLISHMENTS: Ecole[] = applyUpdates(
  BASE_ESTABLISHMENTS,
  parcoursupUpdates as unknown as ParcoursupUpdatesFile,
  pipelineUpdates as unknown as PipelineUpdatesFile
);

// Dates de génération des mises à jour (null tant que les scripts n'ont pas tourné)
export const DATA_UPDATED_AT = {
  parcoursup: (parcoursupUpdates as { generated_at: string | null }).generated_at,
  pipeline: (pipelineUpdates as { generated_at: string | null }).generated_at,
};
