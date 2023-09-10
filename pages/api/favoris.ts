import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Removefavoris from "@/requests/RemoveFavoris";
import addTofavoris from "@/requests/addToFavoris";
import type { NextApiRequest, NextApiResponse } from "next";
import { User, getServerSession } from "next-auth";

type RequestType = {
  id: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    try {
      const { id } = req.body as RequestType;
      const session = await getServerSession(req, res, authOptions);
      if (session && session.user) {
        const results = await addTofavoris(id, session?.user as User);
        return res.status(200).json(results);
      }
    } catch (error) {
      console.log(error);
      return res.status(401).end();
    }
  }
  if (req.method === "DELETE") {
    try {
      const { id } = req?.query as RequestType;
      const session = await getServerSession(req, res, authOptions);
      if (session && session.user) {
        const results = await Removefavoris(id, session?.user as User);
        return res.status(200).json(results);
      }
    } catch (error) {
      console.log(error);
      return res.status(401).end();
    }
  }
  return res.status(404);
}
