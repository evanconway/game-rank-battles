import { BRAND_COLOR } from "../styles";

const GameDescription = ({
  title,
  summary,
  aboutLink,
}: {
  title: string;
  summary: string;
  aboutLink: string;
}) => {
  return (
    <div
      style={{
        width: "50%",
        background: BRAND_COLOR,
        color: "white",
        padding: "1em",
      }}
    >
      <h2>{title}</h2>
      <section style={{ fontSize: "1.25em" }}>
        <p>{summary}</p>
        <a style={{ color: "white" }} href={aboutLink}>
          Learn More
        </a>
      </section>
    </div>
  );
};

export default GameDescription;
