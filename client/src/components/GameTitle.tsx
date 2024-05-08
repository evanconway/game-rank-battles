import { BRAND_COLORS } from "../styles";

const GameTitle = ({
  children,
  onClick,
  disabled,
  isVictor,
  hovered,
  setHovered,
}: {
  children: string;
  onClick: () => void;
  disabled: boolean;
  hovered: boolean;
  setHovered: (hovered: boolean) => void;
  isVictor?: boolean;
}) => {
  let titleColor = hovered ? "white" : BRAND_COLORS.text;
  if (isVictor !== undefined) {
    titleColor = isVictor ? BRAND_COLORS.victor : BRAND_COLORS.loser;
  }

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      disabled={disabled}
      onClick={onClick}
      style={{
        width: "50%",
        padding: 0,
        margin: 0,
        border: "none",
        cursor: disabled ? "default" : "pointer",
        background: BRAND_COLORS.appBackground,
        color: titleColor,
      }}
    >
      <h2>{children}</h2>
    </button>
  );
};

export default GameTitle;
