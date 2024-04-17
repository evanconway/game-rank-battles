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
        background: "black",
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
          background: "black",
        }}
        disabled={disabled}
      >
        <img
          style={{
            width: "100%",
            padding: 0,
            margin: 0,
            opacity: disabled ? 0.5 : 1,
          }}
          src={coverUrl}
        ></img>
      </button>
    </div>
  );
};

export default Game;
