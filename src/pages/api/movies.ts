import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

import { getMoviesByUser, Movie } from "../../modal/user.modal";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await axios.get(
    `${process.env.API_BASE_URL}/search/movie?query=${req.query.title}&language=en-US&include_adult=false&api_key=${process.env.API_KEY}`
  );

  const moviesByUser = await getMoviesByUser();

  const filteredResult = result.data.results?.filter((movie: Movie) => {
    return !moviesByUser[req.query.username as string]?.movies?.some(
      (userMovie: any) => userMovie.title === movie.title
    );
  });

  res.status(200).json({ movieResults: filteredResult });
}
