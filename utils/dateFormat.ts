import moment from "moment";

const DAY_LABELS = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"] as const;

/**
 * Formate une date pour l'affichage des matchs
 * @param date - Date au format ISO string
 * @returns Date formatée (ex: "Aujourd'hui", "Demain", "Lun, 15/01")
 */
export const formatMatchDate = (date: string): string => {
  const current = moment(date);
  const today = moment();
  const day = current.date();
  const month = current.month() + 1;

  // Vérifier si c'est aujourd'hui
  if (current.isSame(today, "day")) {
    return "Aujourd'hui";
  }

  // Vérifier si c'est demain
  if (current.isSame(today.clone().add(1, "day"), "day")) {
    return "Demain";
  }

  // Sinon retourner le jour et la date
  const dayText = DAY_LABELS[current.day()];
  const monthFormatted = month < 10 ? `0${month}` : month;

  return `${dayText}, ${day}/${monthFormatted}`;
};

/**
 * Formate l'heure d'un match
 * @param date - Date au format ISO string
 * @returns Heure formatée (ex: "14:30")
 */
export const formatMatchTime = (date: string): string => {
  const current = moment(date);
  const hour = current.hour();
  const minutes = current.minutes();
  const minutesFormatted = minutes === 0 ? "00" : minutes.toString().padStart(2, "0");

  return `${hour}:${minutesFormatted}`;
};
