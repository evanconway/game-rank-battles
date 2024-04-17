import { useEffect, useMemo, useState } from "react";
import Game, { GameData } from "./Game";

const Battle = () => {
  const [battleData, setBattleData] = useState<Record<string, unknown> | null>(
    null,
  );

  const [uploading, setUploading] = useState(false);

  const fetchBattle = useMemo(() => {
    return async () => {
      const response = await (
        await fetch("/app/battle/start", { method: "POST" })
      ).json();
      setBattleData(response);
    };
  }, [setBattleData]);

  useEffect(() => {
    if (battleData !== null) return;
    fetchBattle();
  }, [fetchBattle, battleData]);

  if (battleData === null)
    return <div style={{ textAlign: "center" }}>fetching battle data...</div>;

  const gameA = battleData["gameA"] as Record<string, unknown>;
  const gameB = battleData["gameB"] as Record<string, unknown>;

  const gameAId = gameA["id"] as number;
  const gameBId = gameB["id"] as number;

  const gameDataA: GameData = {
    name: gameA["name"] as string,
    coverUrl: gameA["coverUrl"] as string,
    igdbUrl: gameA["igdbUrl"] as string,
    releaseDate: gameA["releaseDate"] as number,
    summary: gameA["summary"] as string,
  };

  const gameDataB: GameData = {
    name: gameB["name"] as string,
    coverUrl: gameB["coverUrl"] as string,
    igdbUrl: gameB["igdbUrl"] as string,
    releaseDate: gameB["releaseDate"] as number,
    summary: gameB["summary"] as string,
  };

  const submitVictor = async (victorId: number, loserId: number) => {
    setUploading(true);
    await fetch("/app/battle/end", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        battleId: battleData["battleId"],
        victorId,
        loserId,
      }),
    });
    await fetchBattle();
    setUploading(false);
  };

  return (
    <div style={{ display: "flex" }}>
      <Game
        name={gameDataA.name}
        coverUrl={gameDataA.coverUrl}
        igdbUrl={gameDataA.igdbUrl}
        releaseDate={gameDataA.releaseDate}
        summary={gameDataA.summary}
        onClick={() => submitVictor(gameAId, gameBId)}
        disabled={uploading}
      />
      <Game
        name={gameDataB.name}
        coverUrl={gameDataB.coverUrl}
        igdbUrl={gameDataB.igdbUrl}
        releaseDate={gameDataB.releaseDate}
        summary={gameDataB.summary}
        onClick={() => submitVictor(gameBId, gameAId)}
        disabled={uploading}
      />
    </div>
  );
};

export default Battle;
