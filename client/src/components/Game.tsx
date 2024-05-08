import { BRAND_COLORS } from "../styles";

const Game = ({
  coverUrl,
  onClick,
  disabled,
  isVictor,
  hovered,
  setHovered,
}: {
  coverUrl: string;
  onClick: () => void;
  disabled: boolean;
  hovered: boolean;
  setHovered: (hovered: boolean) => void;
  isVictor?: boolean;
}) => {
  let opacity = 1;
  let background = BRAND_COLORS.appBackground;
  if (isVictor !== undefined) {
    opacity = isVictor ? 1 : 0.3;
  } else {
    opacity = hovered ? 0.6 : 1;
    if (hovered) background = "white";
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "50%",
      }}
    >
      <button
        onClick={onClick}
        style={{
          width: "100%",
          padding: 0,
          border: "none",
          borderWidth: 0,
          cursor: disabled ? "default" : "pointer",
          background: background,
        }}
        disabled={disabled}
      >
        <img
          style={{
            display: "block",
            width: "100%",
            padding: 0,
            margin: 0,
            opacity: opacity,
          }}
          src={coverUrl}
        ></img>
      </button>
    </div>
  );
};

export default Game;
