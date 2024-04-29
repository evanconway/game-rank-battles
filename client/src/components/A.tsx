import { BRAND_COLORS } from "../styles";

const A = ({ href, children }: { href: string; children: string }) => {
  return (
    <a
      style={{ color: BRAND_COLORS.link, fontSize: "1.25em" }}
      target="_blank"
      href={href}
    >
      {children}
    </a>
  );
};

export default A;
