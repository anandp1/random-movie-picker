// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import { uniqBy } from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.query.title);
  const result = await axios.get(
    `${process.env.API_BASE_URL}?s=${req.query.title}&apikey=${process.env.API_KEY}`
  );
  //   https://www.themoviedb.org?s=ff&apikey=c4c91c16
  //   http://www.omdbapi.com?s=galaxy&apikey=c4c91c16
  //   console.log(
  //     `${process.env.API_BASE_URL}?s=${req.query.title}&apikey=${process.env.API_KEY}`
  //   );
  // uniqBy(data.Search, "Title");
  //   console.log(result.data.Search);
  //   const uniqueTitles = uniqBy(result.data.Search, "Title");
  //   console.log(uniqueTitles);
  //   console.log(result.data);
  res.status(200).json({ movieResults: result.data });
}
