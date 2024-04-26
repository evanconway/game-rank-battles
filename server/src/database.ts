import { Database as Sqlite3Database } from "sqlite3";
import { open } from "sqlite";
import { createTables } from "./createTables";
import { Game } from "./models";
import { eloGetNewRanks } from "./elo";

// function signatures
export type DatabaseAddPlatform = (
  id: number,
  name: string,
  abbreviation: string,
) => Promise<void>;
export type DatabaseDeleteAllGames = () => Promise<void>;
export type DatabaseAddGame = (game: Game) => Promise<void>;
export type DatabaseGetGameIds = () => Promise<number[]>;
export type DatabaseGetGameById = (gameId: number) => Promise<Game>;
export type DatabaseUpdateGameElo = (
  victorId: number,
  loserId: number,
) => Promise<void>;
interface GameWithRank {
  name: string;
  rank: number;
  summary: string;
  igdbUrl: string;
  coverUrl: string;
}
export type DatabaseGetGameRanks = (page: number) => Promise<GameWithRank[]>;
export type DatabaseGetGameEloById = (gameId: number) => Promise<number>;
export type DatabaseGetTotalNumOfRankPages = () => Promise<number>;

const RANK_GAMES_PER_PAGE = 10;

// function definitions
const getDatabaseFunctions = async () => {
  const db = await open({
    filename: "database.db",
    driver: Sqlite3Database,
  });

  await createTables(db);

  const databaseAddPlatform: DatabaseAddPlatform = async (
    id: number,
    name: string,
    abbreviation: string,
  ) => {
    await db.run(
      "INSERT OR REPLACE INTO platform VALUES ($id, $name, $abbrev)",
      {
        $id: id,
        $name: name,
        $abbrev: abbreviation,
      },
    );
  };

  /**
   * BEWARE! This does exactly what you think it does. Removes all games from the
   * database. It only removes the game entries and not their Elo ratings. Intended
   * to be used when loading a new batch of games.
   */
  const databaseDeleteAllGames: DatabaseDeleteAllGames = async () => {
    await db.run("DELETE FROM game");
  };

  const databaseAddGame: DatabaseAddGame = async (game: Game) => {
    await db.run(
      "INSERT OR REPLACE INTO game VALUES ($id, $name, $release_date, $summary, $igdb_url, $cover_url, $rating)",
      {
        $id: game.id,
        $name: game.name,
        $release_date: game.releaseDate,
        $summary: game.summary,
        $igdb_url: game.igdbUrl,
        $cover_url: game.coverUrl,
        $rating: game.rating,
      },
    );
    await db.run("INSERT OR IGNORE INTO elo (game) VALUES ($game);", {
      $game: game.id,
    });
  };

  const databaseGetGameIds: DatabaseGetGameIds = async () => {
    return (await db.all(`SELECT id FROM game;`)).map(
      (row) => row["id"] as number,
    );
  };

  const databaseGetGameById: DatabaseGetGameById = async (id: number) => {
    const row = await db.get("SELECT * FROM game WHERE id = $id", { $id: id });
    return {
      id: row["id"],
      name: row["name"],
      releaseDate: row["release_date"],
      summary: row["summary"],
      igdbUrl: row["igdb_url"],
      coverUrl: row["cover_url"],
      rating: row["rating"],
    } as Game;
  };

  // TODO: Research transactions in SQLite and ensure logic here doesn't get interrupted
  const databaseUpdateGameElo: DatabaseUpdateGameElo = async (
    victorId: number,
    loserId: number,
  ) => {
    const rankVictor = (
      await db.get("SELECT rank FROM elo WHERE game = $id", {
        $id: victorId,
      })
    )["rank"] as number;
    const rankLoser = (
      await db.get("SELECT rank FROM elo WHERE game = $id", {
        $id: loserId,
      })
    )["rank"] as number;

    const { newRankVictor, newRankLoser } = eloGetNewRanks(
      rankVictor,
      rankLoser,
    );

    await db.run("UPDATE elo SET rank = $rank WHERE game = $id", {
      $rank: newRankVictor,
      $id: victorId,
    });
    await db.run("UPDATE elo SET rank = $rank WHERE game = $id", {
      $rank: newRankLoser,
      $id: loserId,
    });
  };

  const databaseGetGameRanks: DatabaseGetGameRanks = async (page: number) => {
    const rows = await db.all(
      "SELECT * FROM game JOIN elo ON game.id = elo.game ORDER BY rank DESC LIMIT $offset, $limit;",
      { $offset: page * RANK_GAMES_PER_PAGE, $limit: RANK_GAMES_PER_PAGE },
    );
    return rows.map(
      (row, i) =>
        ({
          name: row["name"],
          igdbUrl: row["igdb_url"],
          coverUrl: row["cover_url"],
          summary: row["summary"],
          rank: row["rank"], //TODO: rename this to "rating"
          position: i + 1 + page * RANK_GAMES_PER_PAGE,
        }) as GameWithRank,
    );
  };

  const databaseGetGameEloById: DatabaseGetGameEloById = async (
    gameId: number,
  ) => {
    const row = await db.get("SELECT rank FROM elo WHERE game = $id;", {
      $id: gameId,
    });
    return row["rank"];
  };

  const databaseGetTotalNumOfRankPages: DatabaseGetTotalNumOfRankPages =
    async () => {
      const row = await db.get("SELECT COUNT(id) as count FROM game;");
      const count = row["count"] as number;
      return Math.ceil(count / RANK_GAMES_PER_PAGE);
    };

  return {
    databaseAddPlatform,
    databaseDeleteAllGames,
    databaseAddGame,
    databaseGetGameIds,
    databaseGetGameById,
    databaseUpdateGameElo,
    databaseGetGameRanks,
    databaseGetGameEloById,
    databaseGetTotalNumOfRankPages,
  };
};

export default getDatabaseFunctions;
