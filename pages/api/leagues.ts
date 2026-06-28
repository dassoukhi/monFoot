import getLeagues from "@/requests/leagues";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const results = await getLeagues();
    return res.status(200).json(results);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error in GET /api/leagues:", error);
    }
    return res.status(500).json({ error: "Failed to fetch leagues" });
  }
}
