import React from "react";
import style from "./lead.module.scss";
import { ILead } from "./../../models";
import { Button } from "./../index";
import cx from "classnames";

interface leadProps {
  data: ILead;
  onDelete: (id: string) => void;
  onRunQualification: (id: string) => void;
}

const Lead: React.SFC<leadProps> = (props) => {
  return (
    <React.Fragment>
      <div
        className={cx(style.lead, {
          [style.isProspect]: props.data?.qualification?.isProspect,
          [style.noProspect]:
            props.data?.qualification && !props.data?.qualification?.isProspect,
        })}
      >
        <div className={style.data}>
          <span>{`ID       : ${props.data.nationalId}`}</span>
          <span>{`Name     : ${props.data.firstName} ${props.data.lastName}`}</span>
          <span>{`Email    : ${props.data.email}`}</span>
          <span>{`Birthday : ${new Date(props.data.birthday).toLocaleDateString(
            "en-US"
          )}`}</span>
          {props.data.qualification && (
            <React.Fragment>
              <hr />
              <span>{`Is in Registry    : ${props.data.qualification.isInNationalRegistry}`}</span>
              <span>{`Is in Archive (juditial records)    : ${props.data.qualification.isInNationalArchive}`}</span>
              <span className={style.score}>{`score    : ${props.data.qualification.score.toFixed(
                2
              )}%`}</span>
            </React.Fragment>
          )}
        </div>
        <div className={style.controls}>
          <Button
            height="40px"
            width="100%"
            onClick={() => props.onRunQualification(props.data.nationalId)}
          >
            Run
          </Button>
          <br />
          <Button
            height="40px"
            width="100%"
            onClick={() => props.onDelete(props.data.id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Lead;
