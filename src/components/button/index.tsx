import React, { MouseEvent } from "react";
import style from "./button.module.scss";
import { createUseStyles } from "react-jss";
import cx from "classnames";

interface buttonProps {
  height: string;
  width: string;
  onAddLeadClick: (evt: MouseEvent<HTMLButtonElement>) => void;
}

const useStyles = createUseStyles({
  button: {
    height: (props) => props.height,
    width: (props) => props.width,
  },
});

const Button: React.SFC<buttonProps> = (props) => {
  const classes = useStyles(props);
  return (
    <React.Fragment>
      <button className={cx(style.button, classes.button)} onClick={props.onAddLeadClick}>
        {props.children}
      </button>
    </React.Fragment>
  );
};

export default Button;
