import { Outlet } from "react-router-dom";
import Link from "./components/Link.tsx";
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
        <div style={{ display: "flex", gap: "1em", padding: "1em" }}>
          <Link to="/" name="Home" />
          <Link to="/ranks" name="Rankings" />
          <Link to="/about" name="About" />
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default App;
