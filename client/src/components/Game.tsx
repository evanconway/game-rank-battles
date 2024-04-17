export interface GameData {
  name: string;
  coverUrl: string;
  igdbUrl: string;
  releaseDate: number;
  summary: string;
}

const Game = ({
  name,
  coverUrl,
  igdbUrl,
  releaseDate,
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
        padding: "1em",
        margin: "0.5em",
        border: "0.25em solid",
      }}
    >
      <h3>{name}</h3>
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
      <div>Released {new Date(releaseDate * 1000).toDateString()}</div>
      <p style={{ textAlign: "start" }}>{summary}</p>
      <a href={igdbUrl}>see more...</a>
    </div>
  );
};

export default Game;
