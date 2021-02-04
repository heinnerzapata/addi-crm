import React from "react";
import style from "./stageList.module.scss";

import { Lead } from "./../index";

interface headerProps {}

const StageList: React.SFC<headerProps> = (props) => {
  return (
    <React.Fragment>
      <div className={style.stageList}>
        <h1>CRM Stage list</h1>
        <br />
        <div className={style.leadsContainer}>
          <Lead />
          <Lead />
          <Lead />
          <Lead />
          <Lead />
          <Lead />
          <Lead />
          <Lead />
          <Lead />
          <Lead />
          <Lead />
          <Lead />
          <Lead />
          <Lead />
          <Lead />
          <Lead />
          <Lead />
          <Lead />
          <Lead />
          <Lead />
          <Lead />
          <Lead />
          <Lead />
          <Lead />
        </div>
      </div>
    </React.Fragment>
  );
};

export default StageList;
