import { config } from "dotenv";

config();

const apiBase = "https://api.igdb.com/v4/";

const IGDB_LIMIT = 500;

const getAccess = async () => {
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;

  if (clientId === undefined)
    throw new Error("CLIENT_ID is not defined in .env");
  if (clientSecret === undefined)
    throw new Error("CLIENT_SECRET is not defined in .env");

  // get access token for igdb api
  const response = await (
    await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
      {
        method: "POST",
      },
    )
  ).json();

  const {
    access_token: accessToken,
    expires_in: expiresIn,
    token_type: bearer,
  } = response;
  return { clientId, accessToken };
};

const getAPIFunctions = async () => {
  const { clientId, accessToken } = await getAccess();

  console.log("access token:", accessToken);

  const apiFetch = async (urlEnd: string, body: string) => {
    return (await (
      await fetch(apiBase + urlEnd, {
        method: "POST",
        headers: {
          "Client-ID": clientId,
          Authorization: `Bearer ${accessToken}`,
        },
        body: body,
      })
    ).json()) as any[];
  };

  return {
    getPlatforms: async () => {
      return await apiFetch("platforms", `fields *; limit ${IGDB_LIMIT};`);
    },
    getGamesByPlatform: async (platformId: number) => {
      return await apiFetch(
        "games",
        `fields *; where platforms = [${platformId}]; limit ${IGDB_LIMIT}; sort rating desc;`,
      );
    },
    getGameCoverArtUrl: async (gameId: number) => {
      return await apiFetch("covers", `fields *; where game = ${gameId};`);
    },
  };
};

export default getAPIFunctions;
