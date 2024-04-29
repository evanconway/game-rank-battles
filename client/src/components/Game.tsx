import { BRAND_COLORS } from "../styles";

const Game = ({
  coverUrl,
  onClick,
  disabled,
}: {
  coverUrl: string;
  onClick: () => void;
  disabled: boolean;
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
          }}
          src={coverUrl}
        ></img>
      </button>
    </div>
  );
};

export default Game;
