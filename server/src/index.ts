import express from "express";
import getDatabaseFunctions from "./database";
import getAPIFunctions from "./api";

// hand picked game platforms the website will support
// platforms are ids from IGDB
const platforms = [19];

const startServer = async () => {
  const { getPlatforms, getGamesByPlatform, getGameCoverArtUrls } =
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
    const coverArts = await getGameCoverArtUrls(games.map((g) => g["id"]));
    const gameCoverArtMap = new Map<number, string>();
    for (const row of coverArts) {
      gameCoverArtMap.set(
        row["game"] as number,
        `https://images.igdb.com/igdb/image/upload/t_cover_big/${row["image_id"]}.jpg`,
      );
    }
    console.log(`${games.length} games found for platform id ${platformId}`);
    for (const row of games) {
      const gameId = row["id"] as number;
      const coverArtUrlFromMap = gameCoverArtMap.get(gameId);
      const result = {
        id: gameId,
        name: row["name"] as string,
        releaseDate: row["first_release_date"] as number,
        summary: row["summary"] as string,
        igdbUrl: row["url"] as string,
        coverUrl: coverArtUrlFromMap === undefined ? "" : coverArtUrlFromMap,
      };
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
