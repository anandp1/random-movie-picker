// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { getMoviesByUser } from "../../modal/user.modal";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await axios.get(
    `${process.env.API_BASE_URL}?s=${req.query.title}&apikey=${process.env.API_KEY}`
  );

  const moviesByUser = await getMoviesByUser();

  const filteredResult = result.data.Search.filter((movie: any) => {
    return !moviesByUser[req.query.username as string]?.movies?.some(
      (userMovie: any) => userMovie.title === movie.Title
    );
  });

  res.status(200).json({ movieResults: filteredResult });
}
