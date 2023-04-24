import { TrainerValidationSchema } from "@/common/helper";
import AdminLayout from "@/component/AdminLayout";
import InputBox from "@/component/FormikField/InputBox";
import DeleteIcon from "@/component/Icon/Delete.Icon";
import DogLoader from "@/component/Loader/DogLoader";
import SleepingSloth from "@/component/Loader/SleepingSloth";
import StraightLoader from "@/component/Loader/StraightLoader";
import Trainerservice from "@/service/Trainer";
import { Form, Formik } from "formik";
import Head from "next/head";
import React, { ReactElement, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import ReactPaginate from "react-paginate";

const initialValue = {
  name: "",
  location: "",
  charge: 0,
  contact: 0,
  services: "",
  rating: 0,
};

const Trainer = () => {
  const trainerFormikRef = useRef();
  const [stage, setStage] = useState("create");
  const [editId, setEditId] = useState("");
  const [skip, setSkip] = useState(0);
  const [loader, setLoader] = useState(false);
  const [trainerData, setTrainerserviceData] = useState(initialValue);
  const perPage = 5;
  const { data, isLoading, mutate } = Trainerservice.getAllTrainerByPage(skip, perPage);
  const handleChange = (data: { target: { name: string; value: string } }) => {
    //@ts-ignore
    trainerFormikRef.current.setFieldValue(data.target.name, data.target.value);
  };
  const onTrainerSubmit = (values: typeof initialValue, { resetForm }) => {
    if (stage === "create") {
      (async () =>
        await Trainerservice.create(values).then((promise) => {
          resetForm();
          toast.success("Added new Trainer");
          mutate();
          setStage("create");
        }))();
    }
    if (stage === "edit") {
      (async () => {
        await Trainerservice.udpateTrainerById(editId, values).then((promiose) => {
          resetForm();
          setTrainerserviceData(initialValue);
          toast.success("Updated");
          mutate();
          setStage("create");
        });
      })();
    }
  };
  const deleteUserById = async (id: string) => {
    setTrainerserviceData(initialValue);
    await Trainerservice.removeUserById(id).then((result) => {
      console.log("re", result);
      toast.success("User Removed");
      mutate();
    });
  };

  return (
    <React.Fragment>
      <Head>
        <title>Admin</title>
      </Head>
      <section className="w-full h-full">
        <div>
          <Formik
            innerRef={trainerFormikRef}
            initialValues={trainerData ?? initialValue}
            validationSchema={TrainerValidationSchema}
            enableReinitialize
            onSubmit={onTrainerSubmit}>
            <Form className="z-10">
              <div className="login__container">
                <InputBox
                  inputClassName="login__container__input"
                  labelClassName="login__container__label"
                  id="name"
                  label="Groomer Name"
                  name="name"
                  type="text"
                  placeholder="Enter Groomer Name"
                  onChange={(event: any) => handleChange(event)}
                />
                <InputBox
                  inputClassName="login__container__input"
                  labelClassName="login__container__label"
                  id="location"
                  label="Location"
                  name="location"
                  type="text"
                  placeholder="Enter Location"
                  onChange={(event: any) => handleChange(event)}
                />
                <InputBox
                  inputClassName="login__container__input"
                  labelClassName="login__container__label"
                  id="username"
                  label="Charge"
                  name="charge"
                  type="number"
                  placeholder="Enter Charge"
                  onChange={(event: any) => handleChange(event)}
                />
                <InputBox
                  inputClassName="login__container__input"
                  labelClassName="login__container__label"
                  id="contact"
                  label="Phone Number"
                  name="contact"
                  type="number"
                  placeholder="Enter Phone Number"
                  onChange={(event: any) => handleChange(event)}
                />
                <InputBox
                  inputClassName="login__container__input"
                  labelClassName="login__container__label"
                  id="services"
                  label="Services"
                  name="services"
                  type="text"
                  placeholder="Enter the Services"
                  onChange={(event: any) => handleChange(event)}
                />
                <InputBox
                  inputClassName="login__container__input"
                  labelClassName="login__container__label"
                  id="rating"
                  label="Rating (max 5)"
                  name="rating"
                  type="number"
                  placeholder="Enter the Rating max 5"
                  onChange={(event: any) => handleChange(event)}
                />

                <div className="w-auto flex justify-between items-center gap-4">
                  <button
                    type="submit"
                    className="w-40 bg-[#FF3E4D] p-2 h-14 rounded-[0.75rem] text-black hover:bg-emerald-500 hover:text-green-900 flex justify-center items-center">
                    {loader ? (
                      <StraightLoader className="h-6 w-20" />
                    ) : (
                      <span>{trainerData.name ? "Edit" : "Create"}</span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setTrainerserviceData(initialValue);
                    }}
                    type="button"
                    className="w-40 bg-[#4b57f8] p-2 h-14 rounded-[0.75rem] text-black hover:bg-emerald-500 hover:text-green-900 flex justify-center items-center">
                    <span>Reset</span>
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
        <div>
          {!isLoading ? (
            data.length ? (
              <div className="bg-[#d0f4de] rounded-md">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Location</th>
                      <th>Charge</th>
                      <th>Contact</th>
                      <th>Services</th>
                      <th>Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data[0]?.data?.map((data: any) => (
                      <tr
                        key={data._id}
                        onClick={() => {
                          setTrainerserviceData(data);
                          setStage("edit");
                          setEditId(data._id);
                        }}>
                        <td data-label="name">{data.name}</td>
                        <td data-label="location">{data.location}</td>
                        <td data-label="charge">{data.charge}</td>
                        <td data-label="contact">{data.contact}</td>
                        <td data-label="services">{data.services}</td>
                        <td data-label="services">{data.rating}</td>
                        <td>
                          <button
                            className="w-full items-center flex justify-center "
                            onClick={(event) => {
                              event.stopPropagation();
                              deleteUserById(data._id);
                            }}>
                            <DeleteIcon className="w-6 h-auto" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
                  <div className="flex flex-row items-center justify-end py-3 md:py-0">
                    <ReactPaginate
                      className="flex gap-1 bg-white rounded-md"
                      nextClassName="bg-[#003049] text-white w-10 text-center rounded-r-md"
                      previousClassName="bg-[#003049] text-white w-10 text-center rounded-l-md"
                      activeClassName="bg-[#778da9] w-10 text-center rounded-md"
                      pageClassName="w-10 text-center"
                      breakLabel="..."
                      nextLabel=">"
                      previousLabel="<"
                      initialPage={0}
                      pageRangeDisplayed={data[0].pagination[0].total}
                      pageCount={Math.ceil(data[0].pagination[0].total / perPage)}
                      onPageChange={(event) => {
                        setSkip(event.selected);
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <SleepingSloth />
              </div>
            )
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <DogLoader />
            </div>
          )}
        </div>
      </section>
    </React.Fragment>
  );
};

Trainer.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default Trainer;