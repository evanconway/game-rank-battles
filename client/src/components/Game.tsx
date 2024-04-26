const Game = ({
  title,
  coverUrl,
  onClick,
  disabled,
}: {
  title: string;
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
          background: "black",
          color: "white",
        }}
        disabled={disabled}
      >
        <h2>{title}</h2>
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
