import express from "express";
import path from "path";
import { config } from "dotenv";
import { readFile } from "fs/promises";
import getDatabaseFunctions from "./database";
import appRouter from "./app";
import { getMetaTags } from "./injectMeta";

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

  const indexHTML = (
    await readFile(path.join(__dirname, staticFilesRelativeDir, "index.html"))
  ).toString();

  const injectStr = "<!--inject-here-->";

  app.get("/", (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    res.send(indexHTML.replace(injectStr, getMetaTags(url)));
    return;
  });

  app.use(express.static(path.join(__dirname, staticFilesRelativeDir)));

  app.get("*", (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (url.pathname === "/favicon.ico") {
      res.sendStatus(404);
      return;
    }

    if (url.pathname === "/share") {
      res.send(
        indexHTML.replace(
          injectStr,
          getMetaTags(
            url,
            "Which would you choose?",
            `https://${url.host}/app/image?a=${req.query["a"]}&b=${req.query["b"]}`,
          ),
        ),
      );
      return;
    }

    res.send(indexHTML.replace(injectStr, getMetaTags(url)));
  });

  const port = process.env["PORT"];
  if (port === undefined) throw new Error("PORT is not defined in .env");
  app.listen(port, () => {
    console.log(`app running at http://localhost:${port}`);
  });
};

startServer();
