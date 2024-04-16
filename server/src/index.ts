import express from "express";
import { config } from "dotenv";
import getDatabaseFunctions from "./database";
import getAPIFunctions from "./api";

config();

const apiBase = "https://api.igdb.com/v4/";

// hand picked game platforms the website will support
// platforms are ids from IGDB
const platforms = [19];

const startServer = async () => {
  const { getPlatforms, getGamesByPlatform } = await getAPIFunctions();
  const { addPlatform } = await getDatabaseFunctions();

  // setup platforms
  const igdbPlatforms = await getPlatforms();
  igdbPlatforms.forEach((row) => {
    addPlatform(row["id"], row["name"], row["abbreviation"]);
  });

  // setup games
  console.log("setting up games, this could take a while...");
  platforms.forEach(async (platform) => {
    const games = (await getGamesByPlatform(platform)).map((row) => {
      const result = {
        id: row["id"],
        name: row["name"],
        releaseDate: row["first_release_date"],
        summary: row["summary"],
        igdbUrl: row["url"],
        coverUrl: "NOT_IMPLEMENTED_YET",
      };
      // get cover art url

      return result;
    });
    console.log(games);
  });
  console.log("game setup complete");

  const app = express();
  app.use(express.json());

  app.listen(3000);
};

startServer();
