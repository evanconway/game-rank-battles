import { Database as Sqlite3Database } from "sqlite3";
import { open } from "sqlite";
import { createTables } from "./createTables";

const getDatabaseFunctions = async () => {
  const db = await open({
    filename: "../database.db",
    driver: Sqlite3Database,
  });

  await createTables(db);

  return {
    databaseAddPlatform: async (
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
    },
    databaseAddGame: async (
      id: number,
      name: string,
      releaseDate: number,
      summary: string,
      igdbUrl: string,
      coverUrl: string,
      rating: number,
    ) => {
      await db.run(
        "INSERT OR REPLACE INTO game VALUES ($id, $name, $release_date, $summary, $igdb_url, $cover_url, $rating)",
        {
          $id: id,
          $name: name,
          $release_date: releaseDate,
          $summary: summary,
          $igdb_url: igdbUrl,
          $cover_url: coverUrl,
          $rating: rating,
        },
      );
      await db.run("INSERT OR IGNORE INTO elo (game) VALUES ($game);", {
        $game: id,
      });
    },
  };
};

export default getDatabaseFunctions;
