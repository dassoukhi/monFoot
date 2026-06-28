import { createRedisInstance } from "@/lib/redis";
import type { NextApiRequest, NextApiResponse } from "next";

const redis = createRedisInstance();

/**
 * API Route pour vider le cache Redis
 * GET /api/clear-cache
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Vider le cache des leagues
    await redis?.del("leaguesDataKey");

    // Optionnel: vider aussi les caches live
    const keys = await redis?.keys("live:*");
    if (keys && keys.length > 0) {
      await redis?.del(...keys);
    }

    return res.status(200).json({
      success: true,
      message: "Cache vidé avec succès !",
      clearedKeys: ["leaguesDataKey", ...(keys || [])]
    });
  } catch (error) {
    console.error("Error clearing cache:", error);
    return res.status(500).json({ error: "Failed to clear cache" });
  }
}
