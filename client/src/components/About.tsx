import { vsBorderStyle } from "../styles";
import A from "./A";

const About = () => {
  return (
    <div style={{ fontSize: "1.25em", textAlign: "left" }}>
      <div
        style={{ ...vsBorderStyle, marginBottom: "2em", textAlign: "center" }}
      >
        about
      </div>
      <section style={{ padding: "1em" }}>
        <h2>The Why</h2>
        <p>
          One night I got drunk and watched{" "}
          <A href="https://en.wikipedia.org/wiki/The_Social_Network">
            The Social Network.
          </A>{" "}
          Which is a movie about a guy who gets drunk and makes a{" "}
          <A href="https://www.thecrimson.com/article/2003/11/19/facemash-creator-survives-ad-board-the/">
            problematic website
          </A>
          . And while the site is questionable, the scene is awesome. The music
          is sick and it's a great movie all around. It got me inspired so I
          thought "If I could make something like this what would I do instead?"
          Which got me thinking about a light-hearted argument I had with a
          friend about Skyrim vs Morrowind. From there it was obvious: games.
          They're super fun to play and discuss.
        </p>
        <h2>The Data</h2>
        <p>
          But how to get a bunch of useful information on everyone's favorite
          games? Luckily people are quite happy to share that information.{" "}
          <A href="https://www.igdb.com/api">IGDB</A> is a publicly available
          database of thousands of games. More than enough for what this site
          needs. And best of all it's free to use for non-commercial use!
        </p>
        <h2>The Tech</h2>
        <p>
          The frontend is written in Typescript React boostrapped with{" "}
          <A href="https://vitejs.dev">Vite</A>. It uses{" "}
          <A href="https://reactrouter.com/en/main">React Router V6</A> for the
          different pages. The backend is a Typescript NodeJS{" "}
          <A href="https://expressjs.com">ExpressJS</A> server hosted on a
          Digital Ocean droplet. The data is persisted with{" "}
          <A href="https://www.sqlite.org/index.html">SQLite</A> and the process
          is kept alive with <A href="https://pm2.keymetrics.io/">PM2</A>.
        </p>
        <h2>The Who</h2>
        <p>
          Hi! I'm <A href="https://evanconway.github.io">Evan Conway</A> and I
          made this site. I love code, music, and of course games. If you're
          looking for a web developer please reach out to me! I'm open to new
          opportunities.
        </p>
      </section>
    </div>
  );
};

export default About;
