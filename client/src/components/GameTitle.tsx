import { BRAND_COLORS } from "../styles";

const GameTitle = ({
  children,
  onClick,
  disabled,
}: {
  children: string;
  onClick: () => void;
  disabled: boolean;
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
        color: "white",
      }}
    >
      <h2>{children}</h2>
    </button>
  );
};

export default GameTitle;
