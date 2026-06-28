/**
 * Constantes pour les appels API
 */

export const API_CONFIG = {
  TIMEOUT: 8000, // 8 secondes
  MAX_MATCHES: 10,
  RAPID_API_HOST: "api-football-v1.p.rapidapi.com",
} as const;

export const CACHE_KEYS = {
  LEAGUES: "leaguesDataKey",
  TEAMS: "teamsDataKey",
} as const;

export const API_ENDPOINTS = {
  // Récupère les matchs d'aujourd'hui (terminés, live, à venir)
  // Si aucun match aujourd'hui, on récupère les prochains
  FIXTURES_TODAY: (leagueId: string) => {
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    return `https://${API_CONFIG.RAPID_API_HOST}/v3/fixtures?league=${leagueId}&date=${today}`;
  },
  FIXTURES_NEXT: (leagueId: string, next: number = API_CONFIG.MAX_MATCHES) =>
    `https://${API_CONFIG.RAPID_API_HOST}/v3/fixtures?league=${leagueId}&next=${next}`,
  FIXTURES: (leagueId: string, next: number = API_CONFIG.MAX_MATCHES) =>
    `https://${API_CONFIG.RAPID_API_HOST}/v3/fixtures?league=${leagueId}&next=${next}`,
  TEAMS: (search: string) =>
    `https://${API_CONFIG.RAPID_API_HOST}/v3/teams?search=${search}`,
} as const;
