import React from "react";
import style from "./lead.module.scss";

interface leadProps {}

const Lead: React.SFC<leadProps> = (props) => {
  return <React.Fragment>
    <div className={style.lead}>
      lead
    </div>
  </React.Fragment>;
};

export default Lead;
