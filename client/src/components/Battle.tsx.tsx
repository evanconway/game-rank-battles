import { useState } from "react";
import Game from "./Game";
import { useLoaderData } from "react-router-dom";
import GameDescriptions from "./GameDescriptions";
import { BRAND_COLORS, vsBorderStyle } from "../styles";

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
    setBattleData(await loaderBattlePage());
    setUploading(false);
  };

  const previousBattleElement =
    prevBattle === null ? null : (
      <div
        style={{
          textAlign: "center",
          fontSize: "1.25em",
          paddingBottom: "0.5em",
        }}
      >
        <div style={{ ...vsBorderStyle }}>Previous Battle</div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "0.5em",
          }}
        >
          <div
            style={{
              padding: "0.5em",
              display: "grid",
              gridTemplateColumns: "fit-content(50%) fit-content(50%)",
              gap: "0.5em",
            }}
          >
            <a
              style={{ color: BRAND_COLORS.linkUnclicked }}
              target="_blank"
              href={prevBattle.victor.igdbUrl}
            >
              {prevBattle.victor.name}
            </a>
            <div>
              {` ${Math.floor(prevBattle.victor.rankOld)} to `}
              <span style={{ color: BRAND_COLORS.victor }}>
                {Math.floor(prevBattle.victor.rankNew)}
              </span>
            </div>
            <a
              style={{ color: BRAND_COLORS.linkUnclicked }}
              target="_blank"
              href={prevBattle.loser.igdbUrl}
            >
              {prevBattle.loser.name}
            </a>
            <div>
              {` ${Math.floor(prevBattle.loser.rankOld)} to `}
              <span style={{ color: BRAND_COLORS.loser }}>
                {Math.floor(prevBattle.loser.rankNew)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );

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
        <a
          style={{ color: BRAND_COLORS.linkUnclicked }}
          target="_blank"
          href="https://en.wikipedia.org/wiki/Elo_rating_system"
        >
          Elo Rating
        </a>{" "}
        indicating how highly favored it is. Scroll to the bottom of the page to
        see the results of your choice. Check the rankings page to see which
        games are the most popular.
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
        <Game
          title={gameA.name}
          coverUrl={gameA.coverUrl}
          onClick={() => submitVictor(gameA, gameB)}
          disabled={uploading}
        />
        <Game
          title={gameB.name}
          coverUrl={gameB.coverUrl}
          onClick={() => submitVictor(gameB, gameA)}
          disabled={uploading}
        />
      </div>
      <div
        style={{
          paddingTop: "0.75em",
          textAlign: "center",
        }}
      >
        <button
          disabled={uploading}
          onClick={async () => {
            setUploading(true);
            setBattleData(await loaderBattlePage());
            setUploading(false);
          }}
          style={{
            padding: "0.5em",
            cursor: "pointer",
            color: "white",
            background: BRAND_COLORS.appBackground,
            border: "2px solid",
            borderRadius: "0.5em",
            fontSize: "1.25em",
          }}
        >
          skip battle
        </button>
      </div>
      <GameDescriptions gameA={gameA} gameB={gameB} />
      {previousBattleElement}
    </div>
  );
};

export default Battle;
