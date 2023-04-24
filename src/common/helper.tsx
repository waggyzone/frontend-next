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
  phonenumber: Yup.string().matches(
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
    "Phone number is not valid"
  ),
  password: Yup.string()
    .min(8)
    .required("Required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@|$!%*#?&\-^()_+="',./:;<>[\]{}`~\\\s])[A-Za-z\d@|$!%*#?&\-^()_+="',./:;<>[\]{}`~\\\s]{8,}$/,
      "Must Contain at least 1 Alphabet, Number and a Special Character"
    ),
});

export const ChangePasswordValidationSchema = Yup.object().shape({
  currentpassword: Yup.string().required("Required"),
  changepassword: Yup.string()
    .min(8)
    .required("Required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@|$!%*#?&\-^()_+="',./:;<>[\]{}`~\\\s])[A-Za-z\d@|$!%*#?&\-^()_+="',./:;<>[\]{}`~\\\s]{8,}$/,
      "Include 1 Alphabet, Number & a SpecialCharacter"
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
export const CreatePetValidationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  breed: Yup.string().required("Required"),
  price: Yup.number().required("Required").min(10, "Minimum price  10"),
  color: Yup.string().required("Required"),
  dob: Yup.date().required("Date of Birth is required").max(new Date(), "Future date not allowed"),
});

export const ContactValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  subject: Yup.string().required("Required"),
  message: Yup.string().required("Required"),
});

export const UpdateUserValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  age: Yup.number().required().max(100),
  username: Yup.string().required("Required"),
  phonenumber: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    )
    .max(10, "Provide 10 digit number"),
});

export const GroomerValidationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  location: Yup.string().required("Required"),
  charge: Yup.number().required("Required").min(10, "Minimum price  10"),
  contact: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    )
    .max(10, "Provide 10 digit number"),
  services: Yup.string().required("Required"),
  rating: Yup.number().required("Required").max(5, "Maximum 5"),
});
export const TrainerValidationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  location: Yup.string().required("Required"),
  charge: Yup.number().required("Required").min(10, "Minimum price  10"),
  contact: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    )
    .max(10, "Provide 10 digit number"),
  services: Yup.string().required("Required"),
  rating: Yup.number().required("Required").max(5, "Maximum 5"),
});
