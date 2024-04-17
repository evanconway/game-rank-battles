import {
  DatabaseGetGameById,
  DatabaseGetGameIds,
  DatabaseGetGameRanks,
  DatabaseUpdateGameElo,
} from "database";
import { Router } from "express";
import { v4 as uuid } from "uuid";

interface Battle {
  gameA: number;
  gameB: number;
}

const appRouter = (
  databaseGetGameIds: DatabaseGetGameIds,
  databaseGetGameById: DatabaseGetGameById,
  databaseUpdateGameElo: DatabaseUpdateGameElo,
  databaseGetGameRanks: DatabaseGetGameRanks,
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

    await databaseUpdateGameElo(victorId, loserId);

    res.status(200).json({ victorId });
    return;
  });

  router.get("/ranks", async (req, res) => {
    res.json(await databaseGetGameRanks(0));
  });

  router.use("*", (req, res) => {
    res.send("app route not defined");
  });

  return router;
};

export default appRouter;
