import { BRAND_COLORS } from "../styles";

const NextOrShare = ({
  onNextClick,
  nextDisabled,
  onShareClick,
  nextText,
  includeShare,
}: {
  onNextClick: () => void;
  nextDisabled: boolean;
  nextText: string;
  onShareClick: () => void;
  includeShare: boolean;
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "0.75em",
        textAlign: "center",
        gap: "1em",
      }}
    >
      <button
        disabled={nextDisabled}
        onClick={onNextClick}
        style={{
          padding: "0.5em",
          cursor: nextDisabled ? "default" : "pointer",
          color: "white",
          background: BRAND_COLORS.appBackground,
          border: "2px solid",
          borderRadius: "0.5em",
          fontSize: "1.25em",
        }}
      >
        {nextText}
      </button>
      {includeShare ? (
        <button
          onClick={onShareClick}
          style={{
            padding: "0.5em",
            cursor: "pointer",
            color: "white",
            background: BRAND_COLORS.appBackground,
            border: "2px solid",
            borderRadius: "0.5em",
            fontSize: "1.25em",
          }}
        >
          share this battle
        </button>
      ) : null}
    </div>
  );
};

export default NextOrShare;
