import { useState } from "react";
import Game from "./Game";
import { useLoaderData } from "react-router-dom";
import GameDescriptions from "./GameDescriptions";
import { vsBorderStyle } from "../styles";
import A from "./A";
import GameTitle from "./GameTitle";
import BattleResults, { BattleResultData } from "./BattleResults";
import NextOrShare from "./SkipOrShare";

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

  const [prevBattle, setPrevBattle] = useState<BattleResultData | null>(null);

  const [battleState, setBattleState] = useState<
    "loading" | "view" | "upload" | "results"
  >("view");

  const submitVictor = async (victor: GameData, loser: GameData) => {
    setBattleState("upload");
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
    setPrevBattle(response as BattleResultData);
    setBattleState("results");
  };

  const gameAIsVictor =
    prevBattle === null ? undefined : prevBattle.victor.name === gameA.name;

  const gameBIsVictor =
    prevBattle === null ? undefined : prevBattle.victor.name === gameB.name;

  return (
    <div>
      <section
        style={{
          textAlign: "center",
          fontSize: "1.25em",
          padding: "1em",
          paddingBottom: "5em",
        }}
      >
        We love games and we love comparing things. Below you'll find 2 games.
        Click your favorite. Each game is given an{" "}
        <A href="https://en.wikipedia.org/wiki/Elo_rating_system">Elo Rating</A>{" "}
        indicating how highly favored it is. Check the rankings page to see
        which games are the most popular.
      </section>
      <div
        style={{
          textAlign: "center",
          fontSize: "1.25em",
          ...vsBorderStyle,
        }}
      >
        VS
      </div>
      <div style={{ display: "flex" }}>
        <GameTitle
          disabled={battleState !== "view"}
          onClick={() => submitVictor(gameA, gameB)}
          isVictor={gameAIsVictor}
        >
          {gameA.name}
        </GameTitle>
        <GameTitle
          disabled={battleState !== "view"}
          onClick={() => submitVictor(gameB, gameA)}
          isVictor={gameBIsVictor}
        >
          {gameB.name}
        </GameTitle>
      </div>
      <div style={{ display: "flex" }}>
        <Game
          coverUrl={gameA.coverUrl}
          onClick={() => submitVictor(gameA, gameB)}
          disabled={battleState !== "view"}
          isVictor={gameAIsVictor}
        />
        <Game
          coverUrl={gameB.coverUrl}
          onClick={() => submitVictor(gameB, gameA)}
          disabled={battleState !== "view"}
          isVictor={gameBIsVictor}
        />
      </div>
      <NextOrShare
        onNextClick={async () => {
          setBattleState("loading");
          setPrevBattle(null);
          setBattleData(await loaderBattlePage());
          setBattleState("view");
        }}
        nextDisabled={battleState === "loading" || battleState === "upload"}
        onShareClick={async () => {
          const url = `${document.baseURI}share?a=${gameA.id}&b=${gameB.id}`;
          await navigator.clipboard.writeText(url);
          alert(`Link to ${gameA.name} vs ${gameB.name} copied to clipoard.`);
        }}
        nextText={battleState === "results" ? "Next Battle" : "Skip"}
        includeShare={battleState === "results"}
      />
      {battleState !== "results" || prevBattle === null ? null : (
        <BattleResults battleResults={prevBattle} />
      )}
      <GameDescriptions gameA={gameA} gameB={gameB} />
    </div>
  );
};

export default Battle;
