import Battle from "./components/Battle.tsx";
import { applyBodyHTMLStyles } from "./styles.ts";

const App = () => {
  applyBodyHTMLStyles();

  return (
    <div style={{ background: "white", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ background: "black" }}>
        <h1 style={{ padding: "0.5em", color: "white", marginTop: 0 }}>
          Game Rank Battles
        </h1>
      </div>
      <Battle />
    </div>
  );
};

export default App;
