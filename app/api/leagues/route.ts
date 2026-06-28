import getLeagues from "@/requests/leagues";
import { NextResponse } from "next/server";

/**
 * GET /api/leagues
 * Retourne toutes les ligues avec leurs prochains matchs
 */
export async function GET() {
  try {
    const leagues = await getLeagues();
    return NextResponse.json(leagues);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error in GET /api/leagues:", error);
    }
    return NextResponse.json(
      { error: "Failed to fetch leagues" },
      { status: 500 }
    );
  }
}
