import moment from "moment";

const expireRedis = () => {
  const tomorrow = moment()?.add(1, "day").startOf("day");
  const today = moment();
  //   console.log("start of tommorow:", tomorrow.toLocaleString());
  //   console.log("today:", today.toLocaleString());
  //   console.log("diff:", tomorrow.diff(today));
  const MAX_AGE = tomorrow.diff(today); // Jusqu'à minuit

  // Cache court pour matchs du jour (5 minutes = 300000ms)
  // Permet de voir les changements live/terminé plus rapidement
  const MAX_AGE_TODAY = 300000; // 5 minutes

  return { MAX_AGE, MAX_AGE_TODAY };
};
export const { MAX_AGE, MAX_AGE_TODAY } = expireRedis();
