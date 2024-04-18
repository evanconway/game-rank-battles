import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
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

  const [searchParams, _] = useSearchParams();

  console.log(Object.fromEntries(searchParams.entries()));

  useEffect(() => {
    const g = async () => {
      setRanks(
        (await (
          await fetch(
            "/app/ranks?" +
              new URLSearchParams(Object.fromEntries(searchParams.entries())),
          )
        ).json()) as Rank[],
      );
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
              flexDirection: "column",
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
            <img src={rank.coverUrl} />
            <div style={{ padding: "0.5em" }}>
              <div>{rank.name}</div>
              <div>{Math.floor(rank.rank)}</div>
              <p>{rank.summary}</p>
              <a target="_blank" style={{ color: "white" }} href={rank.igdbUrl}>
                Learn More
              </a>
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
              <section style={{ color: "white", width: "100%" }}>
                <img
                  style={{
                    float: "left",
                    paddingRight: "0.5em",
                  }}
                  src={rank.coverUrl}
                />
                <h2 style={{ marginTop: 0, paddingTop: "0.5em" }}>
                  {rank.name}
                </h2>
                <div>{Math.floor(rank.rank)}</div>
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
              <div style={{ clear: "both" }}></div>
            </div>
          </li>
        ),
      )}
    </ul>
  );
};

export default Ranks;
