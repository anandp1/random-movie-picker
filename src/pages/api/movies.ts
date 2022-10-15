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

  res.status(200).json({ movieResults: result.data });
}
