//@ts-nocheck
import { CreateAddPetValidationSchema, CreatePetValidationSchema } from "@/common/helper";

import FileInput from "@/component/FormikField/FileInput";
import InputBox from "@/component/FormikField/InputBox";
import StraightLoader from "@/component/Loader/StraightLoader";
import cloudUploadService from "@/service/cloudUpload";
import AddPetService from "@/service/product";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import Router from "next/router";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { product } from "../types/types";
import StoreService from "@/service/store";
const initialValue = {
  name: "",
  bread: "",
  price: 0,
  dob: "",
  color: "",
  public_id: "",
  image: "",
};

const AddPet: NextPage<{ slug?: string[]; data?: product }> = ({ slug = "add", data }) => {
  const addAddPetFormikRef = useRef();
  const [loader, setLoader] = useState<Boolean>(false);
  const [hover, setHover] = useState<Boolean>(false);

  const formData = new FormData();

  const createAddPet = async (values: typeof initialValue) => {
    setLoader(true);
    const result = await cloudUploadService.upload(formData);
    if (result) {
      initialValue.public_id = result.public_id;
      addAddPetFormikRef.current.setFieldValue("image", result.url);
      values.image = result.url;
      values.public_id = result.public_id;
      StoreService.create(values)
        .then((promise) => {
          if (promise) {
            toast.success("New Pet Added");
            setLoader(false);
            Router.replace(`/store`);
          } else {
            toast.loading("Something went wrong");
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    } else {
      toast.loading("Something went wrong");
    }
  };

  /**
   * @namespace Register
   * @function handleChange
   * @param data
   * @description setField values for the respective inputs
   */
  const handleChange = (data: { target: { name: any; value: any } }): void => {
    //@ts-ignore
    addAddPetFormikRef.current.setFieldValue(data.target.name, data.target.value);
  };

  const handleOnDropFile = async (event) => {
    formData.append("file", event.target.files[0]);
  };

  return (
    <div className="register w-ful pt-32">
      <div className="register__container">
        <Formik
          innerRef={addAddPetFormikRef}
          initialValues={initialValue}
          validationSchema={CreatePetValidationSchema}
          onSubmit={createAddPet}>
          <Form noValidate>
            <span className="text-3xl animate-pulse capitalize"> {slug[0].toString()} AddPet</span>
            <InputBox
              inputClassName="login__container__input"
              labelClassName="login__container__label"
              id="name"
              label="Name"
              name="name"
              type="text"
              placeholder="Enter a Pet Name"
              onChange={(event: any) => handleChange(event)}
            />
            <InputBox
              inputClassName="login__container__input"
              labelClassName="login__container__label"
              id="breed"
              label=" Breed"
              name="breed"
              type="text"
              placeholder="Enter a Breed Name"
              onChange={(event: any) => handleChange(event)}
            />
            <InputBox
              inputClassName="login__container__input"
              labelClassName="login__container__label"
              id="price"
              label="Price"
              name="price"
              type="number"
              placeholder="Enter a  Price"
              onChange={(event: any) => handleChange(event)}
            />
            <InputBox
              inputClassName="login__container__input"
              labelClassName="login__container__label"
              id="color"
              label="Color"
              name="color"
              type="text"
              placeholder="Enter a  Price"
              onChange={(event: any) => handleChange(event)}
            />
            <InputBox
              inputClassName="login__container__input"
              labelClassName="login__container__label"
              id="dob"
              label="DOB"
              name="dob"
              type="date"
              placeholder="Enter a  Price"
              onChange={(event: any) => handleChange(event)}
            />
            <FileInput
              inputClassName="login__container__input"
              labelClassName="login__container__label"
              id="image"
              label="Pet Image"
              name="image"
              type="text"
              placeholder="Provide an Image"
              onDrop={(event) => handleOnDropFile(event)}
              onFileChange={(event) => handleOnDropFile(event)}
              onChange={(event: any) => handleChange(event)}
            />

            <div className="login__container__button">
              <button
                type="submit"
                className="bg-[#FF3E4D] p-2 h-14 rounded-[0.75rem] text-black hover:bg-emerald-500 hover:text-green-900 flex justify-center items-center">
                {loader ? (
                  <StraightLoader className="h-6 w-20" />
                ) : (
                  <span>{slug[0] === "edit" ? "Edit" : "Create"}</span>
                )}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddPet;
AddPet.auth = true;
