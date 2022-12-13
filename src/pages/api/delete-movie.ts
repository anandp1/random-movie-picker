// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { deleteMovieFromUser } from "../../modal/user.modal";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { imdbID, username, title, imageUrl } = req.query;

  await deleteMovieFromUser(title as string, imageUrl as string, imdbID as string, username as string);

  res.status(200).json({ message: "Sucessfully Deleted" });
}
