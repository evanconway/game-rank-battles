import { Database } from "sqlite";

export const createTables = async (db: Database) => {
  await db.run(``);
};
