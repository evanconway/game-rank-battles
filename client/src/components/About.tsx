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
        <h2 style={{ margin: 0 }}>But Why?</h2>
        <p>
          One night I got drunk and watched{" "}
          <A href="https://en.wikipedia.org/wiki/The_Social_Network">
            The Social Network.
          </A>{" "}
          Which is a movie that starts with a guy getting drunk and making a{" "}
          <A href="https://www.thecrimson.com/article/2003/11/19/facemash-creator-survives-ad-board-the/">
            problematic website
          </A>
          .
        </p>
        <footer style={{ textAlign: "center" }}>
          by <A href="https://evanconway.github.io">Evan Conway</A>
        </footer>
      </section>
    </div>
  );
};

export default About;
