//@ts-check
import { CreateProductValidationSchema } from "@/common/helper";
import InputBox from "@/component/FormikField/InputBox";
import StraightLoader from "@/component/Loader/StraightLoader";
import ProductService from "@/service/product";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";

const initialValue = {
  name: "",
  brandname: "",
  price: 0,
};

const Product: NextPage = () => {
  const addProductFormikRef = useRef();
  const [loader, setLoader] = useState<Boolean>(false);

  const onCreateProductFormSubmit = (values: typeof initialValue) => {
    ProductService.create(values)
      .then((promise) => {
        if (promise) {
          toast.success("New product Added");
        } else {
          toast.loading("Something went wrong");
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  /**
   * @namespace Register
   * @function handleChange
   * @param data
   * @description setField values for the respective inputs
   */
  const handleChange = (data: { target: { name: any; value: any } }): void => {
    //@ts-ignore
    addProductFormikRef.current.setFieldValue(data.target.name, data.target.value);
  };

  return (
    <div className="register">
      <div className="register__container">
        <Formik
          innerRef={addProductFormikRef}
          initialValues={initialValue}
          validationSchema={CreateProductValidationSchema}
          onSubmit={onCreateProductFormSubmit}
        >
          <Form>
            <span className="text-3xl animate-pulse"> Create Product</span>
            <InputBox
              inputClassName="login__container__input"
              labelClassName="login__container__label"
              id="product"
              label="Product Name"
              name="name"
              type="text"
              placeholder="Enter a Product Name"
              onChange={(event: any) => handleChange(event)}
            />
            <InputBox
              inputClassName="login__container__input"
              labelClassName="login__container__label"
              id="brandname"
              label="BrandName Name"
              name="brandname"
              type="text"
              placeholder="Enter a Product Brand Name"
              onChange={(event: any) => handleChange(event)}
            />
            <InputBox
              inputClassName="login__container__input"
              labelClassName="login__container__label"
              id="price"
              label="Product Price"
              name="price"
              type="number"
              placeholder="Enter a Product Price"
              onChange={(event: any) => handleChange(event)}
            />

            <div className="login__container__button">
              <button
                type="submit"
                className="bg-[#FF3E4D] p-2 h-14 rounded-[0.75rem] text-black hover:bg-emerald-500 hover:text-green-900 flex justify-center items-center"
              >
                {loader ? <StraightLoader className="h-6 w-20" /> : <span>Create</span>}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Product;
Product.auth = true;
