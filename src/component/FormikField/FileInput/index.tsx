//@ts-check
import { useField } from "formik";
import React, { useState } from "react";
/**
 * @namespace FormikField
 * @component FileInput
 * @param props
 * @returns {JSX.Element}
 */
const FileInput: React.FC = (props: any): JSX.Element => {
  const [field, meta] = useField(props);
  const { id, name, value, type, placeholder } = props;
  const [dragEnabled, setDragEnabled] = useState(false);
  return (
    <div className={`formik ${props.className}`}>
      <label
        className={`formik__label ${props.labelClassName}`}
        htmlFor={props.name}
        id={`input-${props.name}`}>
        {props?.label}
      </label>
      <input
        className={` ${
          dragEnabled ? "outline-dotted scale-105" : "outline-black"
        } p-2 rounded-md outline-1 outline  w-full h-full bg-white`}
        type="file"
        id="fileupload"
        onDragEnter={() => setDragEnabled(true)}
        onDragLeave={() => setDragEnabled(false)}
        onDrop={(event) => props.onDrop(event)}
        onChange={(event) => props.onFileChange(event)}
      />
      <input
        hidden
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

export default FileInput;
