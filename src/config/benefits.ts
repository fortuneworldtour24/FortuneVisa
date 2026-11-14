import benefits from './benefits.json';

export type Benefit = {
  id: string;
  title: string;
  intro: string;
  bullets: string[];
  details: { key: string; value: string }[];
  icon: string;
  enabled: boolean;
};

export default benefits;