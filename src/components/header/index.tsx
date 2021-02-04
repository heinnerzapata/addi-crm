import React from "react";
import style from "./header.module.scss";

interface headerProps {}

const Header: React.SFC<headerProps> = (props) => {
  return <React.Fragment>
    <header className={style.header}>
      header
    </header>
  </React.Fragment>;
};

export default Header;
