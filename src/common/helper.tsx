import * as Yup from "yup";

export const LoginFormValidationSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

export const CreateUserValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  age: Yup.number().required().max(100),
  username: Yup.string().required("Required"),
  password: Yup.string()
    .min(8)
    .required("Required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@|$!%*#?&\-^()_+="',./:;<>[\]{}`~\\\s])[A-Za-z\d@|$!%*#?&\-^()_+="',./:;<>[\]{}`~\\\s]{8,}$/,
      "Must Contain at least 1 Alphabet, Number and a Special Character"
    ),
});

export const CreateProductValidationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  brandname: Yup.string().required("Required"),
  price: Yup.number().required("Required").min(10, "Minimum price  10"),
});

export const CreateAccessoriesValidationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  size: Yup.string().required("Required"),
  price: Yup.number().required("Required").min(10, "Minimum price  10"),
  color: Yup.string().required("Required"),
});

export const ContactValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  subject: Yup.string().required("Required"),
  message: Yup.string().required("Required"),
});
