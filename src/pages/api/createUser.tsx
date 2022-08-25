import { NextApiRequest, NextApiResponse } from "next";
import getManagementApiAccesstoken from "./getManagementApiAccesstoken";

type ICreateUser = {
  userId: string;
  email: string;
  password: string;
  name: string;
  orgId: string;
};

const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId, email, password, name, orgId } = req.body as ICreateUser;
    const managementApiAccessToken = await getManagementApiAccesstoken();

    const response = await fetch(
      `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + managementApiAccessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          email,
          password,
          name,
          user_metadata: {
            status: "UNVERIFIED",
            userId: parseInt(userId),
            orgId: orgId,
          },
          connection: "Username-Password-Authentication",
        }),
      }
    );
    const data = await response.json();
    res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default createUser;
