import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const NavLinks = (props) => {
  const { to, bg, name, textColor, handleLogout } = props;
  return (
    <Link
      to={to}
      style={{
        background: bg,
        color: textColor,
        padding: "8px 20px",
        marginRight: "12px",
        textDecoration: "none",
        borderRadius: "8px",
        fontWeight: "bolder",
        letterSpacing: "1px",
      }}
      onClick={handleLogout}
    >
      {name}
    </Link>
  );
};

export default NavLinks;
