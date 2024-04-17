import Battle from "./components/Battle.tsx";

const App = () => {
  const body = Array.from(document.getElementsByTagName("body"))[0];
  body.style["margin"] = "0";

  const html = Array.from(document.getElementsByTagName("html"))[0];
  html.style["overflowY"] = "scroll";
  html.style["fontFamily"] = "Arial, Helvetica, sans-serif";
  html.style["background"] = "#6d0000";

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
