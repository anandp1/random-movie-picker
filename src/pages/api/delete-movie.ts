// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { AddBusinessRounded } from "@mui/icons-material";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { addMovieToUser } from "../../modal/user.modal";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, title, imdbID, imageUrl } = req.body;

  await addMovieToUser(username, title, imdbID, imageUrl);

  res.status(200).json({ message: "Sucessfully added" });
}
