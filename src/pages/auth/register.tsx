import { CreateUserValidationSchema } from "@/common/helper";
import InputBox from "@/component/FormikField/InputBox";
import StraightLoader from "@/component/Loader/StraightLoader";
import UserService from "@/service/user";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import Router from "next/router";
import { MouseEvent, useRef, useState } from "react";
import { toast } from "react-hot-toast";

const initialValue = {
  firstName: "",
  lastName: "",
  age: 18,
  username: "",
  password: "",
};

const Register: NextPage = () => {
  const registerFormikRef = useRef();
  const [loader, setLoader] = useState<Boolean>(false);
  /**
   * @namespace Register
   * @function handleChange
   * @param data
   * @description setField values for the respective inputs
   */
  const handleChange = (data: { target: { name: any; value: any } }): void => {
    //@ts-ignore
    registerFormikRef.current.setFieldValue(data.target.name, data.target.value);
  };

  /**
   * @namespace Register
   * @function onRegisterFormSubmit
   * @param values
   */
  const onRegisterFormSubmit = async (values: typeof initialValue) => {
    const result = await UserService.create(values);
    if (result.code === 11000) {
      toast.error("Username should be unique");
    }
    if (result.username) {
      toast.success("Account Created successfully", {
        position: "top-center",
      });
      Router.push("/");
    }
  };
  /**
   * @namespace Register
   * @name onClickToGoLogin
   * @param event
   */
  const onClickToGoLogin = (event: MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    signIn();
  };

  return (
    <div className="register">
      <div className="register__container">
        <Formik
          innerRef={registerFormikRef}
          initialValues={initialValue}
          validationSchema={CreateUserValidationSchema}
          onSubmit={onRegisterFormSubmit}>
          <Form>
            <span className="text-3xl animate-pulse"> Create an account</span>
            <InputBox
              inputClassName="login__container__input"
              labelClassName="login__container__label"
              id="first-name"
              label="FirstName"
              name="firstName"
              type="text"
              placeholder="First Name"
              onChange={(event: any) => handleChange(event)}
            />
            <InputBox
              inputClassName="login__container__input"
              labelClassName="login__container__label"
              id="last-name"
              label="LastName"
              name="lastName"
              type="text"
              placeholder="Last Name"
              onChange={(event: any) => handleChange(event)}
            />
            <InputBox
              inputClassName="login__container__input"
              labelClassName="login__container__label"
              id="age"
              label="Age"
              name="age"
              type="number"
              placeholder="Age"
              onChange={(event: any) => handleChange(event)}
            />
            <InputBox
              inputClassName="login__container__input"
              labelClassName="login__container__label"
              id="username"
              label="Username"
              name="username"
              type="text"
              placeholder="Username"
              onChange={(event: any) => handleChange(event)}
            />
            <InputBox
              inputClassName="login__container__input"
              labelClassName="login__container__label"
              id="password"
              label="Password"
              name="password"
              type="password"
              placeholder="Username"
              onChange={(event: any) => handleChange(event)}
            />

            <div className="login__container__button">
              <button
                type="submit"
                className="bg-[#FF3E4D] p-2 h-14 rounded-[0.75rem] text-black hover:bg-emerald-500 hover:text-green-900 flex justify-center items-center">
                {loader ? <StraightLoader className="h-6 w-20" /> : <span>Create</span>}
              </button>
            </div>
            <div className="login__container__footer pt-8 ">
              <div className="flex flex-row justify-center">
                {"Already have an account? "}
                <div
                  className="text-blue-600 cursor-pointer gap-1"
                  onClick={(event) => onClickToGoLogin(event)}>
                  Login
                </div>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Register;
