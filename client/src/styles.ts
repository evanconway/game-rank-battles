interface BrandColors {
  readonly victor: string;
  readonly loser: string;
  readonly appBackground: string;
  readonly text: string;
  readonly link: string;
  readonly siteBackground: string;
}

export const BRAND_COLORS: BrandColors = {
  victor: "#7f7",
  loser: "#f77",
  appBackground: "#46494C",
  text: "#C5C3C6",
  link: "#DCDCDD",
  siteBackground: "#4C5C68",
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
