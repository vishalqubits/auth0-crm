import { NextApiRequest, NextApiResponse } from "next";
import getManagementApiAccesstoken from "./getManagementApiAccesstoken";

interface IAddUserInOrganization {
  userId: string;
  orgId: string;
}
const addUserInOrganization = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { userId, orgId } = req.body as IAddUserInOrganization;
    const managementApiAccessToken = await getManagementApiAccesstoken();
    const response = await fetch(
      `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/organizations/${orgId}/members`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + managementApiAccessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          members: [`auth0|${parseInt(userId)}`],
        }),
      }
    );
    // const data = await response.json();
    // res.status(201).json({ data });
    res.status(201).json({ message: "User successfull added" });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default addUserInOrganization;
