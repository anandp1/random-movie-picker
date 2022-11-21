// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { AddBusinessRounded } from "@mui/icons-material";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { addMovieToUser, deleteMovieFromUser } from "../../modal/user.modal";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { imdbID, username, title, imageUrl } = req.query;

  // console.log(data);

  await deleteMovieFromUser(title as string, imageUrl as string, imdbID as string, username as string);

  // conso

  res.status(200).json({ message: "Sucessfully Deleted" });
}
