import { useState } from "react";
import Game from "./Game";
import GameDescription from "./GameDescription";
import { useLoaderData } from "react-router-dom";

export interface GameData {
  readonly id: number;
  readonly coverUrl: string;
  readonly igdbUrl: string;
  readonly name: string;
  readonly releaseDate: number;
  readonly summary: string;
}

export const loaderBattlePage = async () => {
  return await (await fetch("/app/battle/start", { method: "POST" })).json();
};

const Battle = () => {
  const loadedBattleData = useLoaderData() as {
    battleId: number;
    gameA: GameData;
    gameB: GameData;
  };

  const [{ gameA, gameB, battleId }, setBattleData] =
    useState(loadedBattleData);

  const [uploading, setUploading] = useState(false);

  const prevBattleStored = window.sessionStorage.getItem("prevBattle");

  const prevBattle =
    prevBattleStored !== null ? JSON.parse(prevBattleStored) : null;

  const submitVictor = async (victor: GameData, loser: GameData) => {
    setUploading(true);
    const response = await (
      await fetch("/app/battle/end", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          battleId: battleId,
          victorId: victor.id,
          loserId: loser.id,
        }),
      })
    ).json();
    window.sessionStorage.setItem("prevBattle", JSON.stringify(response));
    const newBattleData = await loaderBattlePage();
    setBattleData(newBattleData);
    setUploading(false);
  };

  const previousBattleElement =
    prevBattle === null ? null : (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          background: "black",
          color: "white",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: "1.5em" }}>Previous Battle</div>
        <div
          style={{
            padding: "0.5em",
            display: "grid",
            gridTemplateColumns: "fit-content(50%) fit-content(50%)",
            gap: "0.5em",
          }}
        >
          <a
            style={{ color: "white" }}
            target="_blank"
            href={prevBattle.victor.igdbUrl}
          >
            {prevBattle.victor.name}
          </a>
          <div>
            {` ${Math.floor(prevBattle.victor.rankOld)} to `}
            <span style={{ color: "#7f7" }}>
              {Math.floor(prevBattle.victor.rankNew)}
            </span>
          </div>
          <a
            style={{ color: "white" }}
            target="_blank"
            href={prevBattle.loser.igdbUrl}
          >
            {prevBattle.loser.name}
          </a>
          <div>
            {` ${Math.floor(prevBattle.loser.rankOld)} to `}
            <span style={{ color: "#f77" }}>
              {Math.floor(prevBattle.loser.rankNew)}
            </span>
          </div>
        </div>
      </div>
    );

  return (
    <div>
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
      {previousBattleElement}
    </div>
  );
};

export default Battle;
