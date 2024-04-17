import { Link as ReactRouterLink } from "react-router-dom";

const Link = ({ to, name }: { to: string; name: string }) => {
  return (
    <ReactRouterLink to={to} style={{ color: "white", fontSize: "2em" }}>
      {name}
    </ReactRouterLink>
  );
};

export default Link;
