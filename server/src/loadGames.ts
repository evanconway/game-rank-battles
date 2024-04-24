import getAPIFunctions, { Game } from "./api";
import getDatabaseFunctions from "./database";

// hand picked game platforms the website will support
// platforms are ids from IGDB
const platforms = [
  4, // N64
  5, // WII
  6, // PC
  7, // PLAYSTATION
  8, // PLAYSTATION 2
  9, // PLAYSTATION 3
  11, // XBOX
  12, // XBOX 360
  13, // DOS
  18, // NES
  19, // SNES
  20, // NINTENDO DS
  21, // GAMECUBE
  22, // GAME BOY COLOR
  23, // DREAMCAST
  24, // GAME BOY ADVANCE
  29, // SEGA GENESIS
  30, // SEGA 32X
  32, // SEGA SATURN
  33, // GAME BOY
  35, // SEGA GAME GEAR
  37, // NINTENDO 3DS
  38, // PLAYSTATION PORTABLE (PSP)
  41, // WII U
  46, // PLAYSTATION VITA
  48, // PLAYSTATION 4
  49, // XBOX ONE
  52, // ARCADE
  130, // NINTENDO SWITCH
  167, // PLAYSTATION 5
  169, // XBOX SERIES X|S
];

const loadGames = async () => {
  const { getPlatforms, getGamesByPlatform, getGameCoverArtUrls } =
    await getAPIFunctions();
  const { databaseAddPlatform, databaseAddGame, databaseDeleteAllGames } =
    await getDatabaseFunctions();

  // setup platforms
  const igdbPlatforms = await getPlatforms();
  igdbPlatforms.forEach((row) => {
    databaseAddPlatform(row["id"], row["name"], row["abbreviation"]);
  });

  // setup games
  console.log("setting up games, this could take a while...");
  await databaseDeleteAllGames();
  for (const platformId of platforms) {
    const games = await getGamesByPlatform(platformId);
    const coverArts = await getGameCoverArtUrls(games.map((g) => g["id"]));
    const gameCoverArtMap = new Map<number, string>();
    for (const row of coverArts) {
      gameCoverArtMap.set(
        row["game"] as number,
        `https://images.igdb.com/igdb/image/upload/t_cover_big/${row["image_id"]}.jpg`,
      );
    }
    console.log(`${games.length} games found for platform id ${platformId}`);
    for (const row of games) {
      const gameId = row["id"];
      const coverArtUrlFromMap = gameCoverArtMap.get(gameId);
      const result: Game = {
        id: gameId,
        name: row["name"],
        releaseDate: row["first_release_date"],
        summary: row["summary"],
        igdbUrl: row["url"],
        coverUrl: coverArtUrlFromMap === undefined ? "" : coverArtUrlFromMap,
        rating: row["total_rating"],
      };
      await databaseAddGame(result);
    }
  }

  console.log("game setup complete");
};

loadGames();
