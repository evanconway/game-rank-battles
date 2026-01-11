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
        <h2>The Tech</h2>
        <p>
          The frontend is written in React boostrapped with{" "}
          <A href="https://vitejs.dev">Vite</A>. It uses{" "}
          <A href="https://reactrouter.com/en/main">React Router V6</A> for the
          different pages. The backend is an{" "}
          <A href="https://expressjs.com">ExpressJS</A> server hosted on a
          Digital Ocean droplet. The data is persisted with{" "}
          <A href="https://www.sqlite.org/index.html">SQLite</A> and the process
          is kept alive with <A href="https://pm2.keymetrics.io/">PM2</A>. All
          game data is collected from the{" "}
          <A href="https://www.igdb.com/api">IGDB</A> api.
        </p>
        <h2>The Who</h2>
        <p>
          I'm <A href="https://evanconway.dev/">Evan Conway</A> and I made this
          site. I love code, music, and games. If you're looking for a web
          developer please reach out to me! I'm open to new opportunities.
        </p>
      </section>
    </div>
  );
};

export default About;
