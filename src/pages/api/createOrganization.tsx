import { NextApiRequest, NextApiResponse } from "next";
import getManagementApiAccesstoken from "./getManagementApiAccesstoken";

type ICreateOrganization = {
  name: string;
  displayName: string;
};

const createOrganization = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { name, displayName } = req.body as ICreateOrganization;
    const managementApiAccessToken = await getManagementApiAccesstoken();

    const connectionResponse = await fetch(
      "http://localhost:3000/api/getConnections"
    );
    const connectionData = await connectionResponse.json();
    const usernamePasswordAuth = connectionData.data.filter((item: any) => {
      return item.name === "Username-Password-Authentication";
    });
    const connectionId = usernamePasswordAuth.map((item: any) => {
      return item.id;
    });
    const usernamePasswordAuthId = connectionId[0];
    const response = await fetch(
      `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/organizations`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + managementApiAccessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          display_name: displayName,
          enabled_connections: [
            {
              connection_id: usernamePasswordAuthId,
              assign_membership_on_login: true,
            },
          ],
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

export default createOrganization;
