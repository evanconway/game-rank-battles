import getDatabaseFunctions from "./database";

const clearGames = async () => {
  console.log("connecting to database");
  const { databaseDeleteAllGames } = await getDatabaseFunctions();
  console.log("deleting games...");
  await databaseDeleteAllGames();
  console.log("all game entries deleted from database");
};

clearGames();
