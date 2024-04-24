import { Outlet } from "react-router-dom";
import Link from "./components/Link.tsx";
import { applyBodyHTMLStyles } from "./styles.ts";
import { useIsPhone } from "./util.ts";

const App = () => {
  applyBodyHTMLStyles();

  const isPhone = useIsPhone();

  return (
    <div style={{ background: "white", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ background: "black" }}>
        <h1
          style={{
            fontSize: "3em",
            textAlign: "center",
            padding: "0.5em",
            paddingBottom: "0",
            color: "white",
            marginBottom: 0,
            marginTop: 0,
          }}
        >
          {isPhone ? ["Games", <br />, "Head-To-Head"] : "Games Head-To-Head"}
        </h1>
        <div
          style={{
            fontSize: "0.65em",
            display: "flex",
            gap: "1em",
            padding: "1em",
            paddingTop: "0.2em",
            paddingBottom: "5em",
            justifyContent: "center",
          }}
        >
          <Link to="/" name="Home" />
          <Link to="/ranks?p=0" name="Rankings" />
          <Link to="/about" name="About" />
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default App;
