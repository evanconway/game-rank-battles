import { Database } from "sqlite";

export const createTables = async (db: Database) => {
  await db.run(`
		CREATE TABLE IF NOT EXISTS platform (
			id           INTEGER PRIMARY KEY
						NOT NULL
						UNIQUE,
			name         TEXT,
			abbreviation TEXT
		);
	`);

  await db.run(`
		CREATE TABLE IF NOT EXISTS game (
				id           INTEGER PRIMARY KEY
														UNIQUE
														NOT NULL,
				name         TEXT    NOT NULL
														UNIQUE,
				release_date INTEGER,
				summary      TEXT,
				igdb_url     TEXT,
				cover_url    TEXT,
				rating       NUMERIC
		);
	`);

  await db.run(`
		CREATE TABLE IF NOT EXISTS elo (
				game INTEGER PRIMARY KEY
										UNIQUE
										NOT NULL,
				rank NUMERIC DEFAULT (1400) 
										NOT NULL
		);
	`);

  console.log("tables created");
};
