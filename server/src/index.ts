import express from "express";
import path from "path";
import { config } from "dotenv";
import getDatabaseFunctions from "./database";
import appRouter from "./app";

config();

const staticFilesRelativeDir = "../../client/dist";

const startServer = async () => {
  const {
    databaseGetGameIds,
    databaseGetGameById,
    databaseUpdateGameElo,
    databaseGetGameRanks,
    databaseGetGameEloById,
    databaseGetTotalNumOfRankPages,
  } = await getDatabaseFunctions();

  // endpoints
  const app = express();
  app.use(express.json());

  app.use(
    "/app",
    appRouter(
      databaseGetGameIds,
      databaseGetGameById,
      databaseUpdateGameElo,
      databaseGetGameRanks,
      databaseGetGameEloById,
      databaseGetTotalNumOfRankPages,
    ),
  );

  app.use(express.static(path.join(__dirname, staticFilesRelativeDir)));

  app.get("*", (req, res) => {
    if (req.url === "/favicon.ico") {
      res.sendStatus(404);
      return;
    }
    res.sendFile(path.join(__dirname, staticFilesRelativeDir, "index.html"));
  });

  const port = process.env["PORT"];
  if (port === undefined) throw new Error("PORT is not defined in .env");
  app.listen(port, () => {
    console.log(`app running at http://localhost:${port}`);
  });
};

startServer();
