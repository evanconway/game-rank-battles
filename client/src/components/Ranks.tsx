import { useEffect, useState } from "react";

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

  return (
    <ul>
      {ranks.map((rank, i) => (
        <li key={i}>
          <div>#{i + 1}</div>
          <img src={rank.coverUrl} />
          <div>{rank.name}</div>
          <div>{rank.rank}</div>
          <a href={rank.igdbUrl}>Learn More</a>
        </li>
      ))}
    </ul>
  );
};

export default Ranks;
