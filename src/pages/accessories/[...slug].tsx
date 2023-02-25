//@ts-nocheck
import { CreateAccessoriesValidationSchema } from "@/common/helper";
import InputBox from "@/component/FormikField/InputBox";
import StraightLoader from "@/component/Loader/StraightLoader";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { GetServerSideProps } from "next";
import { accessories } from "../types/types";
import Router from "next/router";

const initialValue = {
  name: "",
  size: "",
  price: 0,
  color: "",
};

const Accessories: NextPage<{ slug?: string[]; data?: accessories }> = ({ slug = "add", data }) => {
  const addAccessoriesFormikRef = useRef();
  const [loader, setLoader] = useState<Boolean>(false);

  const createAccessories = (values: typeof initialValue) => {
    AccessoriesService.create(values)
      .then((promise) => {
        if (promise) {
          toast.success("New Accessorie Added");
          Router.replace(`/accessories`);
        } else {
          toast.loading("Something went wrong");
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const updateAccessories = (id: string, values: typeof initialValue) => {
    AccessoriesService.update(id, values)
      .then((promise) => {
        if (promise) {
          toast.success("Accessorie Updated");
          Router.replace(`/accessorie`);
        } else {
          toast.loading("Something went wrong");
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const onCreateAccessoriesFormSubmit = (values: typeof initialValue) => {
    if (slug[0] === "add") {
      createAccessories(values);
    }
    if (slug[0] === "edit") {
      updateAccessories(slug[1], values);
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
    addAccessoriesFormikRef.current.setFieldValue(data.target.name, data.target.value);
  };
  console.log("firest", data);
  return (
    <div className="register">
      <div className="register__container">
        <Formik
          innerRef={addAccessoriesFormikRef}
          initialValues={initialValue}
          validationSchema={CreateAccessoriesValidationSchema}
          onSubmit={onCreateAccessoriesFormSubmit}>
          <Form>
            <span className="text-3xl animate-pulse capitalize">
              {" "}
              {slug[0].toString()} Accessories
            </span>
            <InputBox
              inputClassName="login__container__input"
              labelClassName="login__container__label"
              id="accessories"
              label="Accessorie Name"
              name="name"
              type="text"
              value={data?.name}
              placeholder="Enter a Accessorie Name"
              onChange={(event: any) => handleChange(event)}
            />
            <InputBox
              inputClassName="login__container__input"
              labelClassName="login__container__label"
              id="size"
              label="Size"
              name="size"
              type="text"
              value={data?.size}
              placeholder="Enter the size"
              onChange={(event: any) => handleChange(event)}
            />
            <InputBox
              inputClassName="login__container__input"
              labelClassName="login__container__label"
              id="price"
              label="Price"
              name="price"
              type="number"
              value={data?.price}
              placeholder="Enter a Accessorie Price"
              onChange={(event: any) => handleChange(event)}
            />
            <InputBox
              inputClassName="login__container__input"
              labelClassName="login__container__label"
              id="accessories"
              label="Color"
              name="color"
              type="text"
              value={data?.color}
              placeholder="Enter the color"
              onChange={(event: any) => handleChange(event)}
            />

            <div className="login__container__button">
              <button
                type="submit"
                className="bg-[#FF3E4D] p-2 h-14 rounded-[0.75rem] text-black hover:bg-emerald-500 hover:text-green-900 flex justify-center items-center">
                {loader ? <StraightLoader className="h-6 w-20" /> : <span>Create</span>}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const slug = (ctx.query.slug as string[]) ?? [];
  let result;
  if (slug[0] === "edit") {
    result = await AccessoriesService.findById(slug[1]).then((promise) => promise[0]);
  }
  return {
    props: {
      slug: slug,
      data: result || {},
    },
  };
};

export default Accessories;
Accessories.auth = true;
