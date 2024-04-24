import { useIsPhone } from "../util.ts";
import { GameData } from "./Battle.tsx";
import GameDescription from "./GameDescription";

interface Props {
  gameA: GameData;
  gameB: GameData;
}

const GameDescriptions = ({ gameA, gameB }: Props) => {
  const isPhone = useIsPhone();

  return (
    <div style={{ display: "flex", flexDirection: isPhone ? "column" : "row" }}>
      <GameDescription gameData={gameA} />
      <GameDescription gameData={gameB} />
    </div>
  );
};

export default GameDescriptions;
