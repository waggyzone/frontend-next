//@ts-nocheck
import { LoginFormValidationSchema } from "@/common/helper";
import InputBox from "@/component/FormikField/InputBox";
import CatLoader from "@/component/Loader/CatLoader";
import StraightLoader from "@/component/Loader/StraightLoader";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Router from "next/router";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

const initialValue = {
  username: "",
  password: "",
};

const Login: NextPage = () => {
  const loginFormikRef = useRef();
  const [loader, setLoader] = useState<Boolean>(false);

  const { data: session } = useSession();
  /**
   * @namespace Login
   * @function handleChange
   * @param data
   * @description setField values for the respective inputs
   */
  const handleChange = (data: { target: { name: string; value: string } }) => {
    //@ts-ignore
    loginFormikRef.current.setFieldValue(data.target.name, data.target.value);
  };
  /**
   * @namespace Login
   * @function onLoginFormSubmit
   * @param values
   */
  const onLoginFormSubmit = async (values: typeof initialValue) => {
    setLoader(true);
    await signIn("credentials", {
      redirect: false,
      ...values,
      callbackUrl: "/",
    })
      .then((promise) => {
        if (promise?.ok) {
          setLoader(false);
          // Router.push("/");
        } else {
          toast.error("Invalid Credentials");
        }
      })
      .finally(() => setLoader(false));
  };
  /**
   * @namespace Login
   * @function onClickToGoRegister
   * @param event
   */
  const onClickToGoRegister = (event) => {
    event.stopPropagation();
    Router.push("/auth/register");
  };

  useEffect(() => {
    if (session) {
      Router.push("/");
    }
  }, [session]);

  return (
    <div className="login relative">
      <Head>
        <title>SingIn</title>
      </Head>
      <Formik
        innerRef={loginFormikRef}
        initialValues={initialValue}
        validationSchema={LoginFormValidationSchema}
        onSubmit={onLoginFormSubmit}>
        <Form className="z-10">
          <div className="login__container">
            <div className="login__container__header flex flex-col relative ">
              <CatLoader className="h-72 w-72  absolute -top-[8.125rem] -z-1" />
              <h1>Welcome Back</h1>
              <div className="bg-violet-600  w-full z-20 text-transparent">--</div>
            </div>

            <InputBox
              inputClassName="login__container__input"
              labelClassName="login__container__label"
              id="username"
              label="Username"
              name="username"
              type="text"
              placeholder="Enter Username"
              onChange={(event: any) => handleChange(event)}
            />
            <InputBox
              inputClassName="login__container__input"
              labelClassName="login__container__label"
              id="password"
              label="Password"
              name="password"
              type="password"
              placeholder="Enter Password"
              onChange={(event: any) => handleChange(event)}
            />

            <div className="login__container__button">
              <button
                type="submit"
                className="bg-[#FF3E4D] p-2 h-14 rounded-[0.75rem] text-black hover:bg-emerald-500 hover:text-green-900 flex justify-center items-center">
                {loader ? <StraightLoader className="h-6 w-20" /> : <span>Login</span>}
              </button>
            </div>
            <div className="login__container__footer pt-8 ">
              <div className="flex flex-row justify-center">
                {"Don't have an account yet? "}
                <div
                  className="text-blue-600 cursor-pointer gap-1"
                  onClick={(event) => onClickToGoRegister(event)}>
                  Create Account
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
