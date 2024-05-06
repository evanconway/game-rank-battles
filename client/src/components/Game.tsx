import { BRAND_COLORS } from "../styles";

const Game = ({
  coverUrl,
  onClick,
  disabled,
  isVictor,
}: {
  coverUrl: string;
  onClick: () => void;
  disabled: boolean;
  isVictor?: boolean;
}) => {
  return (
    <div
      style={{
        width: "50%",
      }}
    >
      <button
        onClick={onClick}
        style={{
          width: "100%",
          padding: 0,
          margin: 0,
          border: "none",
          cursor: disabled ? "default" : "pointer",
          background: BRAND_COLORS.appBackground,
          color: "white",
        }}
        disabled={disabled}
      >
        <img
          style={{
            width: "100%",
            padding: 0,
            margin: 0,
            opacity: isVictor === undefined || isVictor ? 1 : 0.3,
          }}
          src={coverUrl}
        ></img>
      </button>
    </div>
  );
};

export default Game;
