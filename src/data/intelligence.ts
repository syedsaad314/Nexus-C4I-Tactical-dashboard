export const GLOBAL_INTEL: Record<string, { military: string; crime: number; status: string; pwrIndx: string }> = {
  "United States": { military: "RANK_01", crime: 49.2, status: "STABLE", pwrIndx: "0.0741" },
  "Russia": { military: "RANK_02", crime: 38.9, status: "CONFLICT", pwrIndx: "0.0791" },
  "China": { military: "RANK_03", crime: 24.4, status: "STABLE", pwrIndx: "0.0919" },
  "India": { military: "RANK_04", crime: 44.3, status: "STABLE", pwrIndx: "0.1346" },
  "Pakistan": { military: "RANK_14", crime: 43.4, status: "DEFCON_3", pwrIndx: "0.2626" },
  "France": { military: "RANK_06", crime: 55.3, status: "STABLE", pwrIndx: "0.1798" },
  "Japan": { military: "RANK_07", crime: 22.7, status: "STABLE", pwrIndx: "0.1876" },
  "United Kingdom": { military: "RANK_08", crime: 47.8, status: "STABLE", pwrIndx: "0.1881" },
  "Turkiye": { military: "RANK_09", crime: 41.0, status: "STABLE", pwrIndx: "0.1975" },
  "Israel": { military: "RANK_17", crime: 32.0, status: "ACTIVE_WAR", pwrIndx: "0.3100" },
  // Default fallback for any other country
  "DEFAULT": { military: "UNRANKED", crime: 0, status: "UNKNOWN", pwrIndx: "N/A" }
};