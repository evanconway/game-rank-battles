export const BRAND_COLOR = "#6d0000";

export const applyBodyHTMLStyles = () => {
  const body = Array.from(document.getElementsByTagName("body"))[0];
  body.style["margin"] = "0";

  const html = Array.from(document.getElementsByTagName("html"))[0];
  html.style["overflowY"] = "scroll";
  html.style["fontFamily"] = "Arial, Helvetica, sans-serif";
  html.style["background"] = BRAND_COLOR;
};

export const vsBorderStyle: React.CSSProperties = {
  border: "white solid 0em",
  borderTopWidth: "2px",
  borderBottomWidth: "2px",
};
