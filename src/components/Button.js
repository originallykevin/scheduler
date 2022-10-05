import React, { useDeferredValue } from "react";
import classNames from "classnames";
import "components/Button.scss";

export default function Button(props) {
  // let buttonClass = "button";

  // if (props.confirm) {
  //   classNames('buttonClass', {'button--confirm': true});
  // }
  // // button button--confirm

  // if (props.danger) {
  //   buttonClass += " button--danger";
  // }

  const myButtonClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger
  });

  return <button
    className={myButtonClass}
    onClick={props.onClick}
    disabled={props.disabled}
  >{props.children}
  </button>;
}