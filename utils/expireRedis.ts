import moment from "moment";

const expireRedis = () => {
  const tomorrow = moment()?.add(1, "day").startOf("day");
  const today = moment();
  //   console.log("start of tommorow:", tomorrow.toLocaleString());
  //   console.log("today:", today.toLocaleString());
  //   console.log("diff:", tomorrow.diff(today));
  const MAX_AGE = tomorrow.diff(today); // 24 hour
  //   const EXPIRY_MS = `PX`;
  return { MAX_AGE };
};
export const { MAX_AGE } = expireRedis();
