export interface CyberThreat {
  id: string;
  type: string;
  source: string;
  target: string;
  color: string;
  s_coord: [number, number];
  t_coord: [number, number];
}