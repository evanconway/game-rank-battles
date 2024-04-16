import express from "express";
import path from "path";
import getDatabaseFunctions from "./database";
import getAPIFunctions, { Game } from "./api";
import appRouter from "./app";

// hand picked game platforms the website will support
// platforms are ids from IGDB
const platforms = [19];

const staticFilesRelativeDir = "../../client/dist";

const startServer = async () => {
  const { getPlatforms, getGamesByPlatform, getGameCoverArtUrls } =
    await getAPIFunctions();
  const {
    databaseAddPlatform,
    databaseAddGame,
    databaseGetGameIds,
    databaseGetGameById,
    databaseUpdateGameElo,
  } = await getDatabaseFunctions();

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
      const gameId = row["id"];
      const coverArtUrlFromMap = gameCoverArtMap.get(gameId);
      const result: Game = {
        id: gameId,
        name: row["name"],
        releaseDate: row["first_release_date"],
        summary: row["summary"],
        igdbUrl: row["url"],
        coverUrl: coverArtUrlFromMap === undefined ? "" : coverArtUrlFromMap,
        rating: row["rating"],
      };
      await databaseAddGame(result);
    }
  }

  console.log("game setup complete");

  // endpoints
  const app = express();
  app.use(express.json());

  app.use(
    "/app",
    appRouter(databaseGetGameIds, databaseGetGameById, databaseUpdateGameElo),
  );

  app.use(express.static(path.join(__dirname, staticFilesRelativeDir)));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, staticFilesRelativeDir, "index.html"));
  });

  const port = 3000;
  app.listen(port, () => {
    console.log(`app running at http://localhost:${port}`);
  });
};

startServer();
