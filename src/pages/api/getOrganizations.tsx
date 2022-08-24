import { NextApiRequest, NextApiResponse } from "next";
import getManagementApiAccesstoken from "./getManagementApiAccesstoken";

const getOrganization = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const managementApiAccessToken = await getManagementApiAccesstoken();
    const response = await fetch(
      `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/organizations`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + managementApiAccessToken,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default getOrganization;
