import { BRAND_COLORS } from "../styles";

const GameTitle = ({
  children,
  onClick,
  disabled,
  isVictor,
}: {
  children: string;
  onClick: () => void;
  disabled: boolean;
  isVictor?: boolean;
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        width: "50%",
        padding: 0,
        margin: 0,
        border: "none",
        cursor: disabled ? "default" : "pointer",
        background: BRAND_COLORS.appBackground,
        color:
          isVictor === undefined
            ? "white"
            : isVictor
              ? BRAND_COLORS.victor
              : BRAND_COLORS.loser,
      }}
    >
      <h2>{children}</h2>
    </button>
  );
};

export default GameTitle;
