interface BrandColors {
  readonly appBackground: string;
  readonly linkUnclicked: string;
  readonly siteBackground: string;
  readonly linkClicked: string;
  readonly text: string;
  readonly victor: string;
  readonly loser: string;
}

export const BRAND_COLORS: BrandColors = {
  appBackground: "#101010",
  linkUnclicked: "#17BEBB",
  siteBackground: "#CD5334",
  linkClicked: "#EDB88B",
  text: "#FAD8D6",
  victor: "#7f7",
  loser: "#f77",
};

export const applyBodyHTMLStyles = () => {
  const body = Array.from(document.getElementsByTagName("body"))[0];
  body.style["margin"] = "0";

  const html = Array.from(document.getElementsByTagName("html"))[0];
  html.style["overflowY"] = "scroll";
  html.style["fontFamily"] = "Arial, Helvetica, sans-serif";
  html.style["background"] = BRAND_COLORS.siteBackground;
};

export const vsBorderStyle: React.CSSProperties = {
  border: `${BRAND_COLORS.text} solid 0em`,
  borderTopWidth: "2px",
  borderBottomWidth: "2px",
};
