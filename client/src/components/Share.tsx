import { useLoaderData } from "react-router-dom";
import { GameData } from "./Battle.tsx";
import { vsBorderStyle } from "../styles";
import GameTitle from "./GameTitle";
import Game from "./Game";
import GameDescriptions from "./GameDescriptions";

export const loaderSharePage = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const gameAId = url.searchParams.get("a");
  const gameBId = url.searchParams.get("b");
  const data = await (
    await fetch(`/app/games?a=${gameAId}&b=${gameBId}`)
  ).json();
  return data;
};

const Share = () => {
  const { gameA, gameB } = useLoaderData() as {
    gameA: GameData;
    gameB: GameData;
  };

  const fakeSubmit = () => {};

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          fontSize: "1.25em",
          ...vsBorderStyle,
        }}
      >
        Which would you choose?
      </div>
      <div style={{ display: "flex" }}>
        <GameTitle disabled={true} onClick={fakeSubmit}>
          {gameA.name}
        </GameTitle>
        <GameTitle disabled={true} onClick={fakeSubmit}>
          {gameB.name}
        </GameTitle>
      </div>
      <div style={{ display: "flex" }}>
        <Game coverUrl={gameA.coverUrl} onClick={fakeSubmit} disabled={true} />
        <Game coverUrl={gameB.coverUrl} onClick={fakeSubmit} disabled={true} />
      </div>
      <GameDescriptions gameA={gameA} gameB={gameB} />
    </div>
  );
};

export default Share;
