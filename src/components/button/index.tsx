import React, { MouseEvent } from "react";
import style from "./button.module.scss";
import { createUseStyles } from "react-jss";
import cx from "classnames";

interface buttonProps {
  height: string;
  width: string;
  size?: string;
  className?: string;
  disabled?: boolean;
  onClick: (evt: MouseEvent<HTMLButtonElement>) => void;
}

const useStyles = createUseStyles({
  button: {
    height: (props) => props.height,
    width: (props) => props.width,
    fontSize: (props) => props.size,
  },
});

const Button: React.SFC<buttonProps> = (props) => {
  const classes = useStyles(props);
  return (
    <React.Fragment>
      <button
        disabled={props.disabled}
        className={cx(style.button, classes.button, props.className, {
          [style.disabled]: props.disabled,
        })}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </React.Fragment>
  );
};

export default Button;
