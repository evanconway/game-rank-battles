import { useEffect, useState } from "react";
import { BRAND_COLOR } from "../styles";
import { useIsPhone } from "../util";

interface Rank {
  coverUrl: string;
  igdbUrl: string;
  summary: string;
  name: string;
  rank: number;
}

const Ranks = () => {
  const [ranks, setRanks] = useState<Rank[]>([]);

  useEffect(() => {
    const g = async () => {
      setRanks((await (await fetch("/app/ranks")).json()) as Rank[]);
    };
    g();
  }, [setRanks]);

  const isPhone = useIsPhone();

  return (
    <ul
      style={{
        listStyle: "none",
        background: BRAND_COLOR,
        margin: 0,
        padding: 0,
      }}
    >
      {ranks.map((rank, i) =>
        isPhone ? (
          <li
            key={i}
            style={{
              color: "white",
              textAlign: "center",
              fontSize: "1.25em",
              display: "flex",
              flexDirection: isPhone ? "column" : "row",
            }}
          >
            <div
              style={{
                background: "black",
                fontSize: "1.5em",
                padding: "0.25em",
              }}
            >
              #
              {(i + 1).toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: isPhone ? "column" : "row",
              }}
            >
              <img src={rank.coverUrl} />
              <div style={{ padding: "0.5em" }}>
                <div>{rank.name}</div>
                <p>{rank.summary}</p>
                <div>{Math.floor(rank.rank)}</div>
                <a
                  target="_blank"
                  style={{ color: "white" }}
                  href={rank.igdbUrl}
                >
                  Learn More
                </a>
              </div>
            </div>
          </li>
        ) : (
          <li
            key={i}
            style={{
              color: "white",
              fontSize: "1.25em",
            }}
          >
            <div
              style={{
                background: "black",
                fontSize: "1.5em",
                padding: "0.25em",
                textAlign: "center",
              }}
            >
              #
              {(i + 1).toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}
            </div>
            <div>
              <section style={{ color: "white" }}>
                <img src={rank.coverUrl} />
                <h2>{rank.name}</h2>
                <p>
                  {rank.summary}{" "}
                  <a
                    target="_blank"
                    style={{ color: "white" }}
                    href={rank.igdbUrl}
                  >
                    Learn More
                  </a>
                </p>
              </section>
              <div>{Math.floor(rank.rank)}</div>
            </div>
          </li>
        ),
      )}
    </ul>
  );
};

export default Ranks;
