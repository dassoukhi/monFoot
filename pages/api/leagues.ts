import getLeagues from "@/requests/leagues";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(404);
  }

  try {
    const results = await getLeagues();
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(401).end();
  }
}
