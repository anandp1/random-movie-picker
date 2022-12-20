import type { NextApiRequest, NextApiResponse } from "next";
import { addMovieToUser } from "../../modal/user.modal";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username } = req.query;

  await addMovieToUser(username as string, req.body);

  res.status(200).json({ message: "Sucessfully added" });
}
