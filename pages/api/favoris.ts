import { authOptions } from "@/lib/nextauth";
import Removefavoris from "@/requests/RemoveFavoris";
import addTofavoris from "@/requests/addToFavoris";
import type { NextApiRequest, NextApiResponse } from "next";
import { User, getServerSession } from "next-auth";
import { z } from "zod";

const FavorisSchema = z.object({
  id: z.string().min(1, "ID is required"),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    try {
      // Validation avec Zod
      const validationResult = FavorisSchema.safeParse(req.body);

      if (!validationResult.success) {
        return res.status(400).json({
          error: "Invalid request",
          details: validationResult.error.issues
        });
      }

      const { id } = validationResult.data;
      const session = await getServerSession(req, res, authOptions);

      if (!session?.user) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const results = await addTofavoris(id, session.user as User);
      return res.status(200).json(results);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error in PUT /api/favoris:", error);
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  if (req.method === "DELETE") {
    try {
      // Validation avec Zod
      const validationResult = FavorisSchema.safeParse(req.query);

      if (!validationResult.success) {
        return res.status(400).json({
          error: "Invalid request",
          details: validationResult.error.issues
        });
      }

      const { id } = validationResult.data;
      const session = await getServerSession(req, res, authOptions);

      if (!session?.user) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const results = await Removefavoris(id, session.user as User);
      return res.status(200).json(results);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error in DELETE /api/favoris:", error);
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
