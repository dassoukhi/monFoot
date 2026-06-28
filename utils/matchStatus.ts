import moment from "moment";

/**
 * Statuts de match selon l'API Football
 */
export const MATCH_STATUS = {
  // Matchs en direct
  LIVE: ["1H", "HT", "2H", "ET", "BT", "P", "SUSP", "INT", "LIVE"],
  // Matchs terminés
  FINISHED: ["FT", "AET", "PEN"],
  // Matchs à venir
  UPCOMING: ["TBD", "NS"],
  // Matchs annulés/reportés
  CANCELLED: ["CANC", "PST", "ABD"],
} as const;

/**
 * Vérifie si un match est en cours (live)
 */
export const isMatchLive = (status: string): boolean => {
  return MATCH_STATUS.LIVE.includes(status as any);
};

/**
 * Vérifie si un match est terminé
 */
export const isMatchFinished = (status: string): boolean => {
  return MATCH_STATUS.FINISHED.includes(status as any);
};

/**
 * Vérifie si un match est à venir
 */
export const isMatchUpcoming = (status: string): boolean => {
  return MATCH_STATUS.UPCOMING.includes(status as any);
};

/**
 * Obtient le label du statut en français
 */
export const getStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    "1H": "1ère mi-temps",
    HT: "Mi-temps",
    "2H": "2ème mi-temps",
    ET: "Prolongations",
    BT: "Pause prolongations",
    P: "Tirs au but",
    FT: "Terminé",
    AET: "Terminé (AP)",
    PEN: "Terminé (TAB)",
    NS: "Pas commencé",
    TBD: "À définir",
    CANC: "Annulé",
    PST: "Reporté",
    ABD: "Abandonné",
    SUSP: "Suspendu",
    INT: "Interrompu",
    LIVE: "En direct",
  };

  return labels[status] || status;
};

/**
 * Détermine si on doit rafraîchir les données d'un match
 * Retourne l'intervalle de polling en millisecondes (0 = pas de polling)
 */
export const getMatchRefreshInterval = (
  status: string,
  fixtureDate: string
): number => {
  // Match en cours : polling toutes les 2 minutes
  if (isMatchLive(status)) {
    return 120000; // 2 minutes
  }

  // Match terminé : pas de polling
  if (isMatchFinished(status)) {
    return 0;
  }

  // Match dans moins de 15 minutes : polling toutes les 5 minutes
  const matchTime = moment(fixtureDate);
  const now = moment();
  const minutesUntilMatch = matchTime.diff(now, "minutes");

  if (minutesUntilMatch > 0 && minutesUntilMatch <= 15) {
    return 300000; // 5 minutes
  }

  // Autres cas : pas de polling
  return 0;
};

/**
 * Filtre les matchs qui nécessitent un refresh (live ou bientôt live)
 */
export const filterLiveMatches = (matches: any[]): number[] => {
  return matches
    .filter((match) => {
      const status = match?.fixture?.status?.short;
      const fixtureDate = match?.fixture?.date;
      return getMatchRefreshInterval(status, fixtureDate) > 0;
    })
    .map((match) => match?.fixture?.id);
};
