import {
  DatabaseGetGameById,
  DatabaseGetGameEloById,
  DatabaseGetGameIds,
  DatabaseGetGameRanks,
  DatabaseGetTotalNumOfRankPages,
  DatabaseUpdateGameElo,
} from "database";
import { Router } from "express";
import { generateMergedImage } from "./mergeImages";
import { v4 as uuid } from "uuid";
import path from "path";

interface Battle {
  gameA: number;
  gameB: number;
}

const appRouter = (
  databaseGetGameIds: DatabaseGetGameIds,
  databaseGetGameById: DatabaseGetGameById,
  databaseUpdateGameElo: DatabaseUpdateGameElo,
  databaseGetGameRanks: DatabaseGetGameRanks,
  databaseGetGameEloById: DatabaseGetGameEloById,
  databaseGetTotalNumOfRankPages: DatabaseGetTotalNumOfRankPages,
) => {
  const battles = new Map<string, Battle>();

  const router = Router();

  router.post("/battle/start", async (req, res) => {
    const battleId = uuid();
    const gameIds = await databaseGetGameIds();
    const idA = gameIds[Math.floor(Math.random() * gameIds.length)];
    const remainingIds = gameIds.filter((id) => id !== idA);
    const idB = remainingIds[Math.floor(Math.random() * remainingIds.length)];
    battles.set(battleId, { gameA: idA, gameB: idB });

    // remove battle automatically after some time
    setTimeout(
      () => {
        battles.delete(battleId);
      },
      1000 * 60 * 60,
    );

    const gameA = await databaseGetGameById(idA);
    const gameB = await databaseGetGameById(idB);

    res.json({ battleId, gameA, gameB });
    return;
  });

  router.post("/battle/end", async (req, res) => {
    const battleId = req.body.battleId as string;
    const battle = battles.get(battleId);
    if (battle === undefined) {
      res.sendStatus(404);
      return;
    } else {
      battles.delete(battleId);
    }

    const victorId = req.body.victorId as number;
    const loserId = req.body.loserId as number;

    if (victorId !== battle.gameA && victorId !== battle.gameB) {
      res.sendStatus(404);
      return;
    }

    if (loserId !== battle.gameA && loserId !== battle.gameB) {
      res.sendStatus(404);
      return;
    }

    // TODO: Perhaps go back later and see if there's a way to do this with less database queries
    const victorOldRank = await databaseGetGameEloById(victorId);
    const loserOldRank = await databaseGetGameEloById(loserId);
    const victor = await databaseGetGameById(victorId);
    const loser = await databaseGetGameById(loserId);

    await databaseUpdateGameElo(victorId, loserId);

    const victorNewRank = await databaseGetGameEloById(victorId);
    const loserNewRank = await databaseGetGameEloById(loserId);

    res.status(200).json({
      victor: { ...victor, rankOld: victorOldRank, rankNew: victorNewRank },
      loser: { ...loser, rankOld: loserOldRank, rankNew: loserNewRank },
    });
    return;
  });

  router.get("/ranks", async (req, res) => {
    try {
      const page = Number.parseInt(req.query["p"] as string);
      const ranks = await databaseGetGameRanks(page);
      const totalNumPages = await databaseGetTotalNumOfRankPages();
      res.json({
        ranks,
        page,
        totalNumPages,
      });
    } catch (err) {
      console.log(err);
      res.json(await databaseGetGameRanks(0));
    }
    return;
  });

  router.get("/image", async (req, res) => {
    try {
      const gameAId = Number.parseInt(req.query["a"] as string);
      const gameBId = Number.parseInt(req.query["b"] as string);
      const gameACoverUrl = (await databaseGetGameById(gameAId)).coverUrl;
      const gameBCoverUrl = (await databaseGetGameById(gameBId)).coverUrl;
      const filePath = await generateMergedImage(gameACoverUrl, gameBCoverUrl);
      res.sendFile(filePath);
    } catch (err) {
      res.sendStatus(404);
      return;
    }
  });

  router.get("/title", (req, res) => {
    res.sendFile(path.join(__dirname, "../title.png"));
    return;
  });

  router.get("/games", async (req, res) => {
    const gameAId = Number.parseInt(req.query["a"] as string);
    const gameBId = Number.parseInt(req.query["b"] as string);
    const gameA = await databaseGetGameById(gameAId);
    const gameB = await databaseGetGameById(gameBId);
    res.json({ gameA, gameB });
    return;
  });

  router.use("*", (req, res) => {
    res.send("app route not defined");
  });

  return router;
};

export default appRouter;
