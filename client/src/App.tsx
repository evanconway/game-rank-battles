import { Outlet } from "react-router-dom";
import Link from "./components/Link.tsx";
import { BRAND_COLORS, applyBodyHTMLStyles } from "./styles.ts";
import { useIsPhone } from "./util.ts";

const App = () => {
  applyBodyHTMLStyles();

  const isPhone = useIsPhone();

  return (
    <div
      style={{
        background: BRAND_COLORS.appBackground,
        color: BRAND_COLORS.text,
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <div style={{ padding: "2em 0 4em 0" }}>
        <h1
          style={{
            fontSize: "3em",
            textAlign: "center",
            paddingBottom: "0",
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
            justifyContent: "center",
          }}
        >
          <Link to="/" name="Battle" />
          <Link to="/ranks?p=0" name="Rankings" />
          <Link to="/about" name="About" />
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default App;
