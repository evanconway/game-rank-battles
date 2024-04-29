import { Link as ReactRouterLink } from "react-router-dom";
import { BRAND_COLORS } from "../styles";

const Link = ({
  to,
  name,
  disabled = false,
}: {
  to: string;
  name: string;
  disabled?: boolean;
}) => {
  const style: React.CSSProperties = {
    color: disabled ? "gray" : BRAND_COLORS.link,
    fontSize: "2em",
  };

  if (disabled) return <span style={style}>{name}</span>;

  return (
    <ReactRouterLink reloadDocument to={to} style={style}>
      {name}
    </ReactRouterLink>
  );
};

export default Link;
