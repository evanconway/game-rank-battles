import { useEffect, useMemo, useState } from "react";
import Game from "./Game";
import GameDescription from "./GameDescription";
import { BRAND_COLOR } from "../styles";

export interface GameData {
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

  const [prevBattle, setPrevBattle] = useState<{
    victor: GameData;
    loser: GameData;
  } | null>(null);

  const submitVictor = async (victor: GameData, loser: GameData) => {
    if (battleData === null) return;
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
    setPrevBattle({ victor, loser });
    await fetchBattle();
    setUploading(false);
  };

  /*
  Be aware that all hooks must be above this return line. The same number
  of hooks must be called each render cycle. If a hook is below this line
  the app will crash.
  */
  if (battleData === null)
    return (
      <div
        style={{ textAlign: "center", background: BRAND_COLOR, color: "white" }}
      >
        fetching battle data...
      </div>
    );

  const gameA = battleData["gameA"] as GameData;
  const gameB = battleData["gameB"] as GameData;

  return (
    <div>
      {prevBattle === null ? (
        <div
          style={{
            background: "black",
            color: "white",
            textAlign: "center",
            padding: "0.5em",
            fontSize: "1.5em",
          }}
        >
          choose your favorite
        </div>
      ) : (
        <div
          style={{
            background: "black",
            color: "white",
            textAlign: "center",
            padding: "0.5em",
          }}
        >
          You chose{" "}
          <a
            style={{ color: "white" }}
            target="_blank"
            href={prevBattle.victor.igdbUrl}
          >
            {prevBattle.victor.name}
          </a>{" "}
          over{" "}
          <a
            style={{ color: "white" }}
            target="_blank"
            href={prevBattle.loser.igdbUrl}
          >
            {prevBattle.loser.name}
          </a>
          .
        </div>
      )}
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
        <GameDescription gameData={gameA} />
        <GameDescription gameData={gameB} />
      </div>
    </div>
  );
};

export default Battle;
