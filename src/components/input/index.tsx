import React, { useState } from "react";
import style from "./input.module.scss";
import cx from "classnames";

interface headerProps {
  type: string;
  placeHolder: string;
  initValue: string;
  title?: string;
  required?: boolean;
  pattern?: string;
  invalid?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.SFC<headerProps> = (props) => {
  const [value, setValue] = useState(props.initValue);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    props.onChange(e);
  };

  return (
    <React.Fragment>
      <div className={style.inputContainer}>
        <span className={style.title}>{props.title}</span>
        <input
          className={cx(style.input, { [style.invalid]: props.invalid })}
          required={props.required}
          pattern={props.pattern}
          type={props.type}
          value={value}
          placeholder={props.placeHolder}
          onChange={handleInputChange}
        />
      </div>
    </React.Fragment>
  );
};

export default Input;
