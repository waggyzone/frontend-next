//@ts-check
import DeleteIcon from "@/component/Icon/Delete.Icon";
import { useField } from "formik";
import Image from "next/image";
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
  const [inputValue, setinputValue] = useState(field.value);
  const [dragEnabled, setDragEnabled] = useState(false);
  return (
    <div className={`formik ${props.className}`}>
      <label
        className={`formik__label ${props.labelClassName}`}
        htmlFor={props.name}
        id={`input-${props.name}`}>
        {props?.label}
      </label>
      {!inputValue ? (
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
      ) : (
        <div
          className=" rounded-md w-full flex justify-center items-center relative"
          onClick={() => {
            setinputValue("");
          }}>
          <DeleteIcon className="w-14 h-14 absolute top-0" />
          <Image
            className={` rounded-md `}
            src={field.value}
            alt={field.value}
            width={50}
            height={50}
            loading="lazy"
          />
        </div>
      )}

      <input
        hidden
        autoComplete="off"
        {...field}
        id={id}
        name={name}
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
