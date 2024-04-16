const SCALE_FACTOR = 400;
const K_FACTOR = 32;
const EXPONENT_BASE = 10;

const eloGetExpected = (rankA: number, rankB: number) => {
  return 1 / (1 + Math.pow(EXPONENT_BASE, (rankB - rankA) / SCALE_FACTOR));
};

const eloGetNewRank = (rankA: number, rankB: number, score: number) => {
  const expectedA = eloGetExpected(rankA, rankB);
  return rankA + K_FACTOR * (score - expectedA);
};

export const eloGetNewRanks = (rankVictor: number, rankLoser: number) => {
  const newRankVictor = eloGetNewRank(rankVictor, rankLoser, 1);
  const newRankLoser = eloGetNewRank(rankLoser, rankVictor, 0);
  return { newRankVictor, newRankLoser };
};
