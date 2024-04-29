import { useIsPhone } from "../util.ts";
import A from "./A.tsx";
import { GameData } from "./Battle.tsx";

const GameDescription = ({ gameData }: { gameData: GameData }) => {
  const isPhone = useIsPhone();

  return (
    <div
      style={{
        width: !isPhone ? "50%" : undefined,
        padding: "1em",
      }}
    >
      {isPhone ? <h2>{gameData.name}</h2> : null}
      <section style={{ fontSize: "1.25em" }}>
        <p>{gameData.summary}</p>
        <A href={gameData.igdbUrl}>Learn More</A>
      </section>
    </div>
  );
};

export default GameDescription;
