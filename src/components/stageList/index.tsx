import React from "react";
import style from "./stageList.module.scss";
import { ILead } from "./../../models/index";

import { Lead } from "./../index";

interface headerProps {
  leads: ILead[];
}

const StageList: React.SFC<headerProps> = (props) => {
  return (
    <React.Fragment>
      <div className={style.stageList}>
        <h1>CRM Stage list</h1>
        <br />
        <div className={style.leadsContainer}>
          {props.leads.map((lead: ILead) => {
            return <Lead data={lead} />;
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default StageList;
