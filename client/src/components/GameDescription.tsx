import { BRAND_COLOR } from "../styles";
import { GameData } from "./Battle.tsx";

const GameDescription = ({ gameData }: { gameData: GameData }) => {
  return (
    <div
      style={{
        width: "50%",
        background: BRAND_COLOR,
        color: "white",
        padding: "1em",
      }}
    >
      <section style={{ fontSize: "1.25em" }}>
        <p>{gameData.summary}</p>
        <a target="_blank" style={{ color: "white" }} href={gameData.igdbUrl}>
          Learn More
        </a>
      </section>
    </div>
  );
};

export default GameDescription;
