import { Link as ReactRouterLink } from "react-router-dom";

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
    color: disabled ? "gray" : "white",
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
