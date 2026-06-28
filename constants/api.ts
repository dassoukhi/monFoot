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
  FIXTURES: (leagueId: string, next: number = API_CONFIG.MAX_MATCHES) =>
    `https://${API_CONFIG.RAPID_API_HOST}/v3/fixtures?league=${leagueId}&next=${next}`,
  TEAMS: (search: string) =>
    `https://${API_CONFIG.RAPID_API_HOST}/v3/teams?search=${search}`,
} as const;
