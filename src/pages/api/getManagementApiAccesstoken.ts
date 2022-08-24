/**
 * This function returns the access token for the management API
 */
const getManagementApiAccesstoken = async () => {
  try {
    const secret = await fetch(
      `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
      {
        method: "POST",
        body: JSON.stringify({
          client_id: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
          client_secret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
          audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
          grant_type: "client_credentials",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await secret.json();

    return data?.access_token;
  } catch (err) {
    console.log(err);
  }
};

export default getManagementApiAccesstoken;
