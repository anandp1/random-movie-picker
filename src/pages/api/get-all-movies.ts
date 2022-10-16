import type { NextApiRequest, NextApiResponse } from "next";
import { getAllMovies, Movie } from "../../modal/user.modal";

interface GetAllMoviesResponse {
  allMovies: Movie[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetAllMoviesResponse>
) {
  const result = await getAllMovies(req.body.users);

  res.status(200).json({ allMovies: result });
}
