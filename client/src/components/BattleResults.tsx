import { BRAND_COLORS } from "../styles";
import A from "./A";

export interface BattleResultData {
  victor: {
    igdbUrl: string;
    name: string;
    rankOld: number;
    rankNew: number;
  };
  loser: {
    igdbUrl: string;
    name: string;
    rankOld: number;
    rankNew: number;
  };
}

const BattleResults = ({
  battleResults,
}: {
  battleResults: BattleResultData;
}) => {
  return (
    <div
      style={{
        textAlign: "center",
        fontSize: "1.25em",
        paddingBottom: "0.5em",
      }}
    >
      <p>
        <A href={battleResults.victor.igdbUrl}>{battleResults.victor.name}</A>
        {` rating increased from ${Math.floor(battleResults.victor.rankOld)} to `}
        <span style={{ color: BRAND_COLORS.victor }}>
          {Math.floor(battleResults.victor.rankNew)}
        </span>
        .
      </p>
      <p>
        <A href={battleResults.loser.igdbUrl}>{battleResults.loser.name}</A>
        {` rating decreased from ${Math.floor(battleResults.loser.rankOld)} to `}
        <span style={{ color: BRAND_COLORS.loser }}>
          {Math.floor(battleResults.loser.rankNew)}
        </span>
        .
      </p>
    </div>
  );
};

export default BattleResults;
