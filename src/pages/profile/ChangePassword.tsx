import { ChangePasswordValidationSchema } from "@/common/helper";
import InputBox from "@/component/FormikField/InputBox";
import StraightLoader from "@/component/Loader/StraightLoader";
import { Form, Formik } from "formik";
import { useRef, useState } from "react";

const initialValue = {
  currentpassword: "",
  changepassword: "",
};

const ChangePassword: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const changePasswordFormikRef = useRef();

  /**
   * @namespace Login
   * @function handleChange
   * @param data
   * @description setField values for the respective inputs
   */
  const handleChange = (data: { target: { name: string; value: string } }) => {
    //@ts-ignore
    changePasswordFormikRef.current.setFieldValue(data.target.name, data.target.value);
  };

  const onChangePasswordProfileSubmit = async (values: typeof initialValue) => {
    // ChangePasswordService.udpateChangePasswordById(values)
    // .then((promise) => {
    //   toast.success("ChangePassword Updated SuccessFully");
    //   mutate();
    // })
    // .catch((error) => {
    //   toast.error("some thing went wrong");
    // });
  };

  return (
    <Formik
      innerRef={changePasswordFormikRef}
      initialValues={initialValue}
      validationSchema={ChangePasswordValidationSchema}
      enableReinitialize
      onSubmit={onChangePasswordProfileSubmit}>
      <Form className="z-10 h-screen">
        <div className="login__container">
          <InputBox
            inputClassName="login__container__input border-2"
            labelClassName="login__container__label"
            id="currentpassword"
            label="Current Password"
            name="currentpassword"
            type="password"
            placeholder="Enter Current Password"
            onChange={(event: any) => handleChange(event)}
          />
          <InputBox
            inputClassName="login__container__input  border-2"
            labelClassName="login__container__label"
            id="changepassword"
            label="New Password"
            name="changepassword"
            type="password"
            placeholder="Enter New Password"
            onChange={(event: any) => handleChange(event)}
          />

          <div className="w-auto">
            <button
              type="submit"
              className="w-40 bg-[#FF3E4D] p-2 h-14 rounded-[0.75rem] text-black hover:bg-emerald-500 hover:text-green-900 flex justify-center items-center">
              {loader ? <StraightLoader className="h-6 w-20" /> : <span>Change</span>}
            </button>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export { ChangePassword };
