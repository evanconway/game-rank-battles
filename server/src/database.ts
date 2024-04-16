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
    addPlatform: async (id: number, name: string, abbreviation: string) => {
      await db.run(
        "INSERT OR REPLACE INTO platform VALUES ($id, $name, $abbrev)",
        {
          $id: id,
          $name: name,
          $abbrev: abbreviation,
        },
      );
    },
    addGame: async (
      id: number,
      name: string,
      releaseDate: number,
      summary: string,
      igdbUrl: string,
      coverUrl: string,
    ) => {
      await db.run(
        "INSERT OR REPLACE INTO game VALUES ($id, $name, $release_date, $summary, $igdb_url, $cover_url)",
        {
          $id: id,
          $name: name,
          $release_date: releaseDate,
          $summary: summary,
          $igdb_url: igdbUrl,
          $cover_url: coverUrl,
        },
      );
    },
  };
};

export default getDatabaseFunctions;
