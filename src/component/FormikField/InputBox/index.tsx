//@ts-check
import { useField } from "formik";
import React from "react";
/**
 * @namespace FormikField
 * @component InputBox
 * @param props
 * @returns {JSX.Element}
 */
const InputBox: React.FC = (props: any): JSX.Element => {
  const [field, meta] = useField(props);
  const { id, name, value, type, placeholder } = props;
  return (
    <div className={`formik ${props.className}`}>
      <label
        className={`formik__label ${props.labelClassName}`}
        htmlFor={props.name}
        id={`input-${props.name}`}
      >
        {props?.label}
      </label>
      <input
        autoComplete="off"
        {...field}
        id={id}
        name={name}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={(event) => props.onChange(event)}
        className={`${props.inputClassName}`}
      />
      <span className="text-red-500 text-right">
        {meta.touched && meta.error ? meta.error : ""}
      </span>
    </div>
  );
};

export default InputBox;
