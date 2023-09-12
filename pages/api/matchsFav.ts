import { authOptions } from "@/lib/nextauth";
import getFavorisMatch from "@/requests/getFavorisMatchs";
import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(404);
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    if (session && session.user) {
      const results = await getFavorisMatch(session?.user as User);
      return res.status(200).json(results);
    }
    throw new Error("Unauthorized");
  } catch (error) {
    console.log(error);
    return res.status(401).end();
  }
}
