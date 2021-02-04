import React, { MouseEvent } from "react";
import style from "./footer.module.scss";
import { Button } from "./../index";

interface headerProps {
  onAddLeadClick: (evt: MouseEvent<HTMLButtonElement>) => void;
}

const Footer: React.SFC<headerProps> = (props) => {
  return (
    <React.Fragment>
      <footer className={style.footer}>
        <Button height="80px" width="70%" onAddLeadClick={props.onAddLeadClick}>
          Add Lend
        </Button>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
