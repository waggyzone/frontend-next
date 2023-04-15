import { Field, Form, Formik, useField } from "formik";
import { NextPage } from "next";
import { useState } from "react";
import * as Yup from "yup";
const initialValue = {
  id: "",
  name: "",
  email: "",
};

export const formValidation = Yup.object().shape({
  id: Yup.number().required().max(9999999999, "Max 10 digit"),
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const TestPage: NextPage = () => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState({});
  const onFormSubmit = (values: typeof initialValue) => {
    setData((prev) => [...prev, values]);
  };
  return (
    <div className="mt-20">
      <Formik
        initialValues={initialValue}
        onSubmit={onFormSubmit}
        validationSchema={formValidation}>
        {({ errors, touched }) => (
          <Form>
            <div>
              <Field name="id" placeholder="id" type="number" default={data1?.id} />
              {errors.id && touched.id ? <span>{errors.id}</span> : null}
            </div>
            <div>
              <Field name="name" placeholder="Name" default={data1?.name} />
              {errors.name && touched.name ? <span>{errors.name}</span> : null}
            </div>
            <div>
              <Field name="email" placeholder="email" type="email" default={data1?.email} />
              {errors.email && touched.email ? <span>{errors.email}</span> : null}
            </div>
            <div>
              <Field
                name="gender"
                value="MALE"
                type="radio"
                // checked={data?.gender === "MALE" ? true : false}
              />
              <Field
                name="gender"
                value="FEMAIL"
                type="radio"
                // checked={data?.gender === "FEMALE" ? true : false}
              />
              {errors.email && touched.email ? <span>{errors.email}</span> : null}
            </div>
            <div>
              <input value="submit" type="submit" />
            </div>
          </Form>
        )}
      </Formik>
      {Array.from(data).map((_data, index) => (
        <h1 onClick={setData1(_data)}>{_data.name}</h1>
      ))}
    </div>
  );
};

export default TestPage;
