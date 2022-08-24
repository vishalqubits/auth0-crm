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
    console.log("organization..", name, displayName);
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
          // branding: {
          //   logo_url: "",
          //   colors: {
          //     primary: "",
          //     page_background: "",
          //   },
          // },
          // metadata: {},
          // enabled_connections: ["object"],
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
