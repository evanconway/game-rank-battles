import { BRAND_COLOR } from "../styles";

export interface GameData {
  name: string;
  coverUrl: string;
  igdbUrl: string;
  releaseDate: number;
  summary: string;
}

const Game = ({
  igdbUrl,
  coverUrl,
  summary,
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
      <section
        style={{
          margin: 0,
          padding: "0.5em",
          textAlign: "start",
          fontSize: "1.25em",
          color: "white",
        }}
      >
        <p>{summary}</p>
        <a href={igdbUrl} style={{ color: "white" }}>
          learn More
        </a>
      </section>
    </div>
  );
};

export default Game;
