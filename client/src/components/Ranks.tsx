import { useLoaderData } from "react-router-dom";
import Link from "./Link.tsx";
import { BRAND_COLORS, vsBorderStyle } from "../styles";
import { useIsPhone } from "../util";

interface Rank {
  coverUrl: string;
  igdbUrl: string;
  summary: string;
  name: string;
  rank: number;
  position: number;
}

export const loaderRankPage = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("p");
  return await (await fetch(`/app/ranks?p=${page}`)).json();
};

const Ranks = () => {
  const { page, ranks, totalNumPages } = useLoaderData() as {
    page: number;
    ranks: Rank[];
    totalNumPages: number;
  };

  const isPhone = useIsPhone();

  const pageSelector = (
    <div
      style={{
        fontSize: "0.65em",
        display: "flex",
        gap: "1em",
        padding: "1em",
        justifyContent: "center",
      }}
    >
      <Link disabled={page <= 0} to="/ranks?p=0" name="First" />
      <Link disabled={page <= 0} to={`/ranks?p=${page - 1}`} name="Prev" />
      <Link
        disabled={page >= totalNumPages - 1}
        to={`/ranks?p=${page + 1}`}
        name="Next"
      />
      <Link
        disabled={page >= totalNumPages - 1}
        to={`/ranks?p=${totalNumPages - 1}`}
        name="Last"
      />
    </div>
  );

  return (
    <div>
      {pageSelector}
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
      >
        {ranks.map((rank, i) =>
          isPhone ? (
            <li
              key={i}
              style={{
                textAlign: "center",
                fontSize: "1.25em",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontSize: "1.5em",
                  padding: "0.25em",
                  ...vsBorderStyle,
                }}
              >
                #
                {rank.position.toLocaleString("en-US", {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                })}
              </div>
              <img src={rank.coverUrl} />
              <div style={{ padding: "0.5em" }}>
                <div>{rank.name}</div>
                <div>{Math.floor(rank.rank)}</div>
                <p>{rank.summary}</p>
                <a
                  style={{ color: BRAND_COLORS.linkUnclicked }}
                  target="_blank"
                  href={rank.igdbUrl}
                >
                  Learn More
                </a>
              </div>
            </li>
          ) : (
            <li
              key={i}
              style={{
                fontSize: "1.25em",
              }}
            >
              <div
                style={{
                  fontSize: "1.5em",
                  padding: "0.25em",
                  textAlign: "left",
                  ...vsBorderStyle,
                }}
              >
                #
                {rank.position.toLocaleString("en-US", {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                })}
              </div>
              <div>
                <section style={{ width: "100%" }}>
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
                      style={{ color: BRAND_COLORS.linkUnclicked }}
                      target="_blank"
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
      {pageSelector}
    </div>
  );
};

export default Ranks;
