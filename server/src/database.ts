import { Database as Sqlite3Database } from "sqlite3";
import path from "path";
import { open } from "sqlite";

const getDatabaseFunctions = async () => {
  const db = await open({
    filename: "../database.db",
    driver: Sqlite3Database,
  });
};

export default getDatabaseFunctions;
