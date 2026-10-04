import { Ecole } from '../../types';
import type { BoussoleState } from './useBoussoleState';

export interface BoussoleSectionProps {
  s: BoussoleState;
  schools: Ecole[];
  onSelectSchool: (ecole: Ecole) => void;
  onToggleCompare: (ecole: Ecole) => void;
  comparedSchoolIds: string[];
}
