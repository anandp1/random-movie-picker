// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { deleteMovieFromUser } from "../../modal/user.modal";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, username } = req.query;

  await deleteMovieFromUser(title as string, username as string);

  res.status(200).json({ message: "Sucessfully Deleted" });
}
