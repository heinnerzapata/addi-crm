import React from "react";
import style from "./lead.module.scss";
import { ILead } from "./../../models";

interface leadProps {
  data: ILead;
}

const Lead: React.SFC<leadProps> = (props) => {
  return (
    <React.Fragment>
      <div className={style.lead}>
        <span>{`Name     : ${props.data.firstName} ${props.data.lastName}`}</span>
        <span>{`Email    : ${props.data.email}`}</span>
        <span>{`Birthday : ${props.data.birthday}`}</span>
      </div>
    </React.Fragment>
  );
};

export default Lead;
