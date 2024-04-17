import { BRAND_COLOR } from "../styles";

export interface GameData {
  name: string;
  coverUrl: string;
  igdbUrl: string;
  releaseDate: number;
  summary: string;
}

const Game = ({
  coverUrl,
  onClick,
  disabled,
}: GameData & {
  onClick: () => void;
  disabled: boolean;
}) => {
  return (
    <div
      style={{
        width: "50%",
        textAlign: "center",
        display: "flex",
        alignContent: "center",
        flexDirection: "column",
        background: BRAND_COLOR,
      }}
    >
      <button
        onClick={onClick}
        style={{
          padding: 0,
          margin: 0,
          border: "none",
          cursor: disabled ? "default" : "pointer",
          background: "black",
        }}
        disabled={disabled}
      >
        <img
          style={{
            width: "100%",
            padding: 0,
            margin: 0,
            opacity: disabled ? 0.5 : 1,
          }}
          src={coverUrl}
        ></img>
      </button>
    </div>
  );
};

export default Game;
