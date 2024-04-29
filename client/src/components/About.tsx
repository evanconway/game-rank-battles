import { BRAND_COLORS } from "../styles";

const About = () => {
  return (
    <section style={{ padding: "0.25em" }}>
      <h2 style={{ margin: 0 }}>Ranking Games</h2>
      <p>
        See your favorite games matched against eachother in a 1 vs 1 popularity
        contest. Each game has an{" "}
        <a
          style={{ color: BRAND_COLORS.link }}
          target="_blank"
          href="https://en.wikipedia.org/wiki/Elo_rating_system"
        >
          Elo Rating
        </a>
        , and winning or losing a battle affects that rating. View the rankings
        page to see the top games.
      </p>
      <footer style={{ textAlign: "center" }}>
        by{" "}
        <a
          style={{ color: BRAND_COLORS.link }}
          target="_blank"
          href="https://evanconway.github.io"
        >
          Evan Conway
        </a>
      </footer>
    </section>
  );
};

export default About;
