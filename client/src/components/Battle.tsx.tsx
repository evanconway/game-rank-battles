import { useEffect, useMemo, useState } from "react";
import Game from "./Game";
import GameDescription from "./GameDescription";

interface GameData {
  readonly id: number;
  readonly coverUrl: string;
  readonly igdbUrl: string;
  readonly name: string;
  readonly releaseDate: number;
  readonly summary: string;
}

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

  const gameA = battleData["gameA"] as GameData;
  const gameB = battleData["gameB"] as GameData;

  const submitVictor = async (victor: GameData, loser: GameData) => {
    setUploading(true);
    await fetch("/app/battle/end", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        battleId: battleData["battleId"],
        victorId: victor.id,
        loserId: loser.id,
      }),
    });
    await fetchBattle();
    setUploading(false);
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <Game
          coverUrl={gameA.coverUrl}
          onClick={() => submitVictor(gameA, gameB)}
          disabled={uploading}
        />
        <Game
          coverUrl={gameB.coverUrl}
          onClick={() => submitVictor(gameB, gameA)}
          disabled={uploading}
        />
      </div>
      <div
        style={{
          margin: 0,
          background: "black",
          color: "white",
          textAlign: "center",
          fontSize: "2em",
        }}
      >
        VS
      </div>
      <div style={{ display: "flex" }}>
        <GameDescription
          title={gameA.name}
          summary={gameA.summary}
          aboutLink={gameA.igdbUrl}
        />
        <GameDescription
          title={gameB.name}
          summary={gameB.summary}
          aboutLink={gameB.igdbUrl}
        />
      </div>
    </div>
  );
};

export default Battle;
