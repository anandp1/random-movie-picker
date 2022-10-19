import type { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "../../modal/user.modal";
import { SignInRole } from "../sign-in";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    let response;

    if (req.body.username === SignInRole.GUEST) {
      response = {
        email: SignInRole.GUEST,
        password: "123456",
      };

      return res.status(200).json(response);
    }

    const user = await getUser(req.body.username);

    if (
      user &&
      user.username === req.body.username &&
      user.password === req.body.password
    ) {
      response = {
        email: user.username,
        password: user.password,
      };
      return res.status(200).json(response);
    }

    return res.status(401).json(response);
  } catch {
    return res.status(500).json({ message: `Internal server error` });
  }
};
//

export default handler;
