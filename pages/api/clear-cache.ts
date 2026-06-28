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
    const clearedKeys: string[] = [];

    // Vider le cache des leagues (ancien)
    await redis?.del("leaguesDataKey");
    clearedKeys.push("leaguesDataKey");

    // Vider les caches des nouveaux types
    await redis?.del("leagues:today");
    clearedKeys.push("leagues:today");
    await redis?.del("leagues:upcoming");
    clearedKeys.push("leagues:upcoming");
    await redis?.del("leagues:live");
    clearedKeys.push("leagues:live");

    // Vider aussi les caches live individuels
    const liveKeys = await redis?.keys("live:*");
    if (liveKeys && liveKeys.length > 0) {
      await redis?.del(...liveKeys);
      clearedKeys.push(...liveKeys);
    }

    return res.status(200).json({
      success: true,
      message: "Cache vidé avec succès !",
      clearedKeys
    });
  } catch (error) {
    console.error("Error clearing cache:", error);
    return res.status(500).json({ error: "Failed to clear cache" });
  }
}
