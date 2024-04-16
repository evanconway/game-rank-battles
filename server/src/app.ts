import { DatabaseGetGameById, DatabaseGetGameIds } from "database";
import { Router } from "express";
import { v4 as uuid } from "uuid";

interface Battle {
  gameA: number;
  gameB: number;
}

const appRouter = (
  databaseGetGameIds: DatabaseGetGameIds,
  databaseGetGameById: DatabaseGetGameById,
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

  router.get("/test", (req, res) => {
    res.send("you found the test route");
  });

  router.use("*", (req, res) => {
    res.send("app route not defined");
  });

  return router;
};

export default appRouter;
