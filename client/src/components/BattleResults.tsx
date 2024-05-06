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
      {/* <div style={{ ...vsBorderStyle }}>Previous Battle</div> */}
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
          <A href={battleResults.victor.igdbUrl}>{battleResults.victor.name}</A>
          <div>
            {` ${Math.floor(battleResults.victor.rankOld)} to `}
            <span style={{ color: BRAND_COLORS.victor }}>
              {Math.floor(battleResults.victor.rankNew)}
            </span>
          </div>
          <A href={battleResults.loser.igdbUrl}>{battleResults.loser.name}</A>
          <div>
            {` ${Math.floor(battleResults.loser.rankOld)} to `}
            <span style={{ color: BRAND_COLORS.loser }}>
              {Math.floor(battleResults.loser.rankNew)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattleResults;
