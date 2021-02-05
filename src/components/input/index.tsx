import React, { useState } from "react";
import style from "./input.module.scss";

interface headerProps {
  type: string;
  placeHolder: string;
  initValue: string;
  title?: string;
  onChange: (value: string) => void;
}

const Input: React.SFC<headerProps> = (props) => {
  const [value, setValue] = useState(props.initValue);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    props.onChange(value);
  };

  return (
    <React.Fragment>
      <div className={style.inputContainer}>
      <span className={style.title}>{props.title}</span>
      <input
        className={style.input}
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
