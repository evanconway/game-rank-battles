import { config } from "dotenv";

config();

const IGDB_LIMIT = 500;
const MINIMUM_USER_RATING_COUNT = 25;

// we want to exclude certain games like bundles, fan hacks, and re-releases
const EXCLUDED_KEYWORDS = [32374, 2453, 27216, 2004];

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

  const { access_token: accessToken } = response;
  return { clientId, accessToken };
};

const getAPIFunctions = async () => {
  const { clientId, accessToken } = await getAccess();

  console.log("access token:", accessToken);

  const apiFetch = async (urlEnd: string, body: string) => {
    return (await (
      await fetch("https://api.igdb.com/v4/" + urlEnd, {
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
      // TODO: modify so we exclude certain games like ones only released in bundles, or re-releases
      return await apiFetch(
        "games",
        `fields *; where platforms = (${platformId}) & keywords != (${EXCLUDED_KEYWORDS.join(",")}) & cover != null & name != null & first_release_date != null & rating_count > ${MINIMUM_USER_RATING_COUNT}; limit ${IGDB_LIMIT}; sort rating desc;`,
      );
    },
    getGameCoverArtUrls: async (gameIds: number[]) => {
      return await apiFetch(
        "covers",
        `fields *; where game = (${gameIds.join(",")}); limit ${IGDB_LIMIT};`,
      );
    },
  };
};

export default getAPIFunctions;
