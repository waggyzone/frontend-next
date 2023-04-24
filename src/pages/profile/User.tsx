import { LoginFormValidationSchema, UpdateUserValidationSchema } from "@/common/helper";
import InputBox from "@/component/FormikField/InputBox";
import CatLoader from "@/component/Loader/CatLoader";
import StraightLoader from "@/component/Loader/StraightLoader";
import { Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import UserService from "@/service/user";
import { toast } from "react-hot-toast";

const initialValue = {
  age: 0,
  firstName: "",
  lastName: "",
  username: "",
};

const User: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const userFormikRef = useRef();
  const [userData, setUserData] = useState(initialValue);

  const { data, isLoading, mutate } = UserService.findUser();

  useEffect(() => {
    setUserData(data?.[0]);
  }, [data]);

  /**
   * @namespace Login
   * @function handleChange
   * @param data
   * @description setField values for the respective inputs
   */
  const handleChange = (data: { target: { name: string; value: string } }) => {
    //@ts-ignore
    userFormikRef.current.setFieldValue(data.target.name, data.target.value);
  };

  const onUserProfileSubmit = async (values: typeof initialValue) => {
    UserService.udpateUserById(values)
      .then((promise) => {
        toast.success("User Updated SuccessFully");
        mutate();
      })
      .catch((error) => {
        toast.error("some thing went wrong");
      });
  };

  return (
    <Formik
      innerRef={userFormikRef}
      initialValues={userData ?? initialValue}
      validationSchema={UpdateUserValidationSchema}
      enableReinitialize
      onSubmit={onUserProfileSubmit}>
      <Form className="z-10">
        <div className="login__container">
          <InputBox
            inputClassName="login__container__input"
            labelClassName="login__container__label"
            id="firstname"
            label="First Name"
            name="firstName"
            type="text"
            placeholder="Enter Username"
            onChange={(event: any) => handleChange(event)}
          />
          <InputBox
            inputClassName="login__container__input"
            labelClassName="login__container__label"
            id="lastname"
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Enter Username"
            onChange={(event: any) => handleChange(event)}
          />
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
            id="phonenumber"
            label="Phone Number"
            name="phonenumber"
            type="number"
            placeholder="Enter Username"
            onChange={(event: any) => handleChange(event)}
          />
          <InputBox
            inputClassName="login__container__input"
            labelClassName="login__container__label"
            id="age"
            label="Age"
            name="age"
            type="number"
            placeholder="Enter Username"
            onChange={(event: any) => handleChange(event)}
          />

          <div className="w-auto">
            <button
              type="submit"
              className="w-40 bg-[#FF3E4D] p-2 h-14 rounded-[0.75rem] text-black hover:bg-emerald-500 hover:text-green-900 flex justify-center items-center">
              {loader ? <StraightLoader className="h-6 w-20" /> : <span>Edit</span>}
            </button>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export { User };
