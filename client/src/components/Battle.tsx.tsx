import { useEffect, useState } from "react";
import Game, { GameData } from "./Game";

const Battle = () => {
  const [battleData, setBattleData] = useState<Record<string, unknown> | null>(
    null,
  );

  const [resultSubmitted, setResultSubmitted] = useState(false);

  useEffect(() => {
    if (battleData !== null) return;
    setResultSubmitted(false);
    const g = async () => {
      const response = await (
        await fetch("/app/battle/start", { method: "POST" })
      ).json();
      setBattleData(response);
    };
    g();
  }, [battleData, setResultSubmitted]);

  if (battleData === null) return <div>fetching battle data...</div>;

  console.log(battleData, resultSubmitted);

  const gameA = battleData["gameA"] as Record<string, unknown>;
  const gameB = battleData["gameB"] as Record<string, unknown>;

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

  return (
    <div style={{ display: "flex" }}>
      <Game
        name={gameDataA.name}
        coverUrl={gameDataA.coverUrl}
        igdbUrl={gameDataA.igdbUrl}
        releaseDate={gameDataA.releaseDate}
        summary={gameDataA.summary}
      />
      <Game
        name={gameDataB.name}
        coverUrl={gameDataB.coverUrl}
        igdbUrl={gameDataB.igdbUrl}
        releaseDate={gameDataB.releaseDate}
        summary={gameDataB.summary}
      />
    </div>
  );
};

export default Battle;
