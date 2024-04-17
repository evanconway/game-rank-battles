import Battle from "./components/Battle.tsx";
import { applyBodyHTMLStyles } from "./styles.ts";

const App = () => {
  applyBodyHTMLStyles();

  return (
    <div style={{ background: "white", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ background: "black" }}>
        <h1
          style={{
            padding: "0.5em",
            color: "white",
            marginBottom: 0,
            marginTop: 0,
          }}
        >
          GAMES HEAD-TO-HEAD
        </h1>
      </div>
      <Battle />
    </div>
  );
};

export default App;
