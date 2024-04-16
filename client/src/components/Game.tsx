export interface GameData {
  name: string;
  coverUrl: string;
  igdbUrl: string;
  releaseDate: number;
  summary: string;
}

const Game = ({ name, coverUrl, igdbUrl, releaseDate, summary }: GameData) => {
  return (
    <div
      style={{
        width: "50%",
        textAlign: "center",
        padding: "1em",
        border: "0.25em solid",
      }}
    >
      <h3>{name}</h3>
      <img style={{ width: "100%" }} src={coverUrl}></img>
      <div>Released {new Date(releaseDate * 1000).toDateString()}</div>
      <p style={{ textAlign: "start" }}>{summary}</p>
      <a href={igdbUrl}>see more...</a>
    </div>
  );
};

export default Game;
