//@ts-check
import { Form, Formik } from "formik";
import { useRef } from "react";
import { ContactValidationSchema } from "@/common/helper";
const initialValue = {
  email: "",
  subject: "",
  message: "",
};

const Contact: React.FC = () => {
  const contactFormRef = useRef();

  const handleChange = (data: { target: { name: any; value: any } }): void => {
    //@ts-ignore
    contactFormRef.current.setFieldValue(data.target.name, data.target.value);
  };

  const onContactSubmit = (values: typeof initialValue) => {
    console.log(values);
  };

  return (
    <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
        Contact Us
      </h2>
      <p className="mb-4 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
        Got a technical issue? Want to send feedback about a beta feature? Need details about our
        Business plan? Let us know.
      </p>
      <Formik
        innerRef={contactFormRef}
        validationSchema={ContactValidationSchema}
        initialValues={initialValue}
        onSubmit={onContactSubmit}>
        {({ errors, touched }) => (
          <Form className="space-y-2">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Your email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="name@waggyzone.com"
                onChange={(event: any) => handleChange(event)}
              />
              <label className="text-red-600">
                {errors.email && touched.email ? <span>{errors.email}</span> : null}
              </label>
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="Let us know how we can help you"
                onChange={(event: any) => handleChange(event)}
              />
              <label className="text-red-600">
                {errors.subject && touched.subject ? <span>{errors.subject}</span> : null}
              </label>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Your message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                onChange={(event: any) => handleChange(event)}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Leave a comment..."></textarea>
              <label className="text-red-600">
                {errors.message && touched.message ? <span>{errors.message}</span> : null}
              </label>
            </div>
            <button
              type="submit"
              className="bg-red-600 py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Send message
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Contact;
