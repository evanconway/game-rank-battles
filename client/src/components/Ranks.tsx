import { useEffect, useState } from "react";
import { BRAND_COLOR } from "../styles";
import { useIsPhone } from "../util";

interface Rank {
  coverUrl: string;
  igdbUrl: string;
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
      {ranks.map((rank, i) => (
        <li
          key={i}
          style={{
            color: "white",
            textAlign: "center",
            fontSize: "1.25em",
          }}
        >
          <div
            style={{
              background: "black",
              fontSize: "1.5em",
              padding: "0.25em",
            }}
          >
            #{i + 1}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: isPhone ? "column" : "row",
            }}
          >
            <img
              style={{ width: "100%", maxWidth: "400px" }}
              src={rank.coverUrl}
            />
            <div style={{ padding: "0.5em" }}>
              <div>{rank.name}</div>
              <div>{Math.floor(rank.rank)}</div>
              <a target="_blank" style={{ color: "white" }} href={rank.igdbUrl}>
                Learn More
              </a>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Ranks;
