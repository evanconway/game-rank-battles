import express from "express";
import { config } from "dotenv";

config();

const apiBase = "https://api.igdb.com/v4/";

const startServer = async () => {
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;

  // get access token for igdb api
  const response = await (
    await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
      {
        method: "POST",
      },
    )
  ).json();

  const {
    access_token: accessToken,
    expires_in: expiresIn,
    token_type: bearer,
  } = response;

  console.log("connected to api, access token:", accessToken);

  // const testRequest = await (
  //   await fetch("https://api.igdb.com/v4/games", {
  //     method: "POST",
  //     headers: {
  //       "Client-ID": clientId,
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //     body: "fields *; limit 10;",
  //   })
  // ).json();

  // platform id 19 is super nintendo

  const testRequest = await (
    await fetch(apiBase + "games", {
      method: "POST",
      headers: {
        "Client-ID": clientId,
        Authorization: `Bearer ${accessToken}`,
      },
      body: "fields *; where platforms = [19] ; limit 500;",
    })
  ).json();

  console.log("test request response:", testRequest);

  const app = express();
  app.use(express.json());

  app.listen(3000);
};

startServer();
