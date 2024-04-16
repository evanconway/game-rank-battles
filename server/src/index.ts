import express from "express";
import getDatabaseFunctions from "./database";
import getAPIFunctions from "./api";

// hand picked game platforms the website will support
// platforms are ids from IGDB
const platforms = [19];

const startServer = async () => {
  const { getPlatforms, getGamesByPlatform, getGameCoverArtUrl } =
    await getAPIFunctions();
  const { databaseAddPlatform, databaseAddGame } = await getDatabaseFunctions();

  // setup platforms
  const igdbPlatforms = await getPlatforms();
  igdbPlatforms.forEach((row) => {
    databaseAddPlatform(row["id"], row["name"], row["abbreviation"]);
  });

  // setup games
  console.log("setting up games, this could take a while...");
  for (const platformId of platforms) {
    const games = await getGamesByPlatform(platformId);
    console.log(`${games.length} games found for platform id ${platformId}`);
    for (const row of games) {
      const result = {
        id: row["id"] as number,
        name: row["name"] as string,
        releaseDate: row["first_release_date"] as number,
        summary: row["summary"] as string,
        igdbUrl: row["url"] as string,
        coverUrl: await getGameCoverArtUrl(row["id"] as number),
      };
      console.log(`${result.name}: ${result.coverUrl}`);
      await databaseAddGame(
        result.id,
        result.name,
        result.releaseDate,
        result.summary,
        result.igdbUrl,
        result.coverUrl,
      );
    }
  }

  console.log("game setup complete");

  const app = express();
  app.use(express.json());

  app.listen(3000);
};

startServer();
