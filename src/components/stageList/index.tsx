import React from "react";
import style from "./stageList.module.scss";
import { ILead } from "./../../models/index";

import { Lead } from "./../index";

interface headerProps {
  leads: ILead[];
  onDelete: (id: string) => void;
  onRunQualification: (id: string) => void;
}

const StageList: React.SFC<headerProps> = (props) => {
  return (
    <React.Fragment>
      <div className={style.stageList}>
        <h1>Stage list (Leads)</h1>
        <br />
        <h1>Q: {props.leads.length}</h1>
        <div className={style.leadsContainer}>
          {props.leads.map((lead: ILead, i: number) => {
            return (
              <Lead
                key={`lead-${i}`}
                data={lead}
                onDelete={props.onDelete}
                onRunQualification={props.onRunQualification}
              />
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default StageList;
