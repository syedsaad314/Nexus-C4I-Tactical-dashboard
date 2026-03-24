export interface CyberThreat {
  id: string;
  s_coord: [number, number];
  t_coord: [number, number];
  type: 'DDoS' | 'Malware' | 'SQLi' | 'Phishing';
  color: string;
  source: string;
  target: string;
}

const NODES: Record<string, [number, number]> = {
  "North America": [-100, 40], "Europe": [10, 50], "Asia": [100, 35],
  "South America": [-60, -20], "Africa": [20, 0], "Australia": [135, -25]
};

const THREAT_TYPES = [
  { type: 'DDoS', color: '#4ade80' },    // Tactical Green
  { type: 'Malware', color: '#22d3ee' },  // Neon Cyan
  { type: 'SQLi', color: '#facc15' },     // Alert Yellow
  { type: 'Phishing', color: '#f87171' }  // Critical Red
];

export const getLiveThreats = (): CyberThreat[] => {
  const keys = Object.keys(NODES);
  return Array.from({ length: 15 }).map((_, i) => {
    const s = keys[Math.floor(Math.random() * keys.length)];
    const t = keys.filter(k => k !== s)[Math.floor(Math.random() * (keys.length - 1))];
    const mode = THREAT_TYPES[Math.floor(Math.random() * THREAT_TYPES.length)];
    return {
      id: `VX-${Math.random().toString(36).toUpperCase().slice(2, 7)}`,
      s_coord: NODES[s],
      t_coord: NODES[t],
      source: s,
      target: t,
      type: mode.type as any,
      color: mode.color
    };
  });
};