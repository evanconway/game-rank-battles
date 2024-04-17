import { Database as Sqlite3Database } from "sqlite3";
import { open } from "sqlite";
import { createTables } from "./createTables";
import { Game } from "./api";
import { eloGetNewRanks } from "./elo";

export type DatabaseAddPlatform = (
  id: number,
  name: string,
  abbreviation: string,
) => Promise<void>;
export type DatabaseAddGame = (game: Game) => Promise<void>;
export type DatabaseGetGameIds = () => Promise<number[]>;
export type DatabaseGetGameById = (gameId: number) => Promise<Game>;
export type DatabaseUpdateGameElo = (
  victorId: number,
  loserId: number,
) => Promise<void>;

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

  return {
    databaseAddPlatform,
    databaseAddGame,
    databaseGetGameIds,
    databaseGetGameById,
    databaseUpdateGameElo,
  };
};

export default getDatabaseFunctions;
