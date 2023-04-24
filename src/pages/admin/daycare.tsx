import AdminLayout from "@/component/AdminLayout";
import DeleteIcon from "@/component/Icon/Delete.Icon";
import Table from "@/component/Table";
import { useFetcher } from "@/hook/useFertcher";
import daycare from "@/service/daycare";
import user from "@/service/user";
import Head from "next/head";
import React, { ReactElement, useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import { mutate } from "swr";
const Daycare = () => {
  const [skip, setSkip] = useState(0);
  const perPage = 5;

  const { data, isLoading, error } = daycare.getAllDaycare(skip + 1, perPage);

  const onChangeOption = (event: any, id: string) => {
    const _selected = event.currentTarget.value;
    Swal.fire({
      icon: "info",
      title: "Do you want to change the role",
      showCancelButton: true,
      confirmButtonText: "yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        const data = { role: event };
        daycare.udpateDaycareById(id, data).then((result) => {
          Swal.fire("Saved!", "", "success");
        });
      } else {
        mutate(data);
      }
    });
  };
  return (
    <React.Fragment>
      <Head>
        <title>Admin</title>
      </Head>
      <section className="w-full h-full container mx-auto py-2 px-5">
        {!isLoading ? (
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
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {data[0].data?.map((data: any) => (
                  <tr key={data._id}>
                    <td data-label="Name">
                      {data.name}
                    </td>
                    <td data-label="name">{data.name}</td>
                    <td data-label="Location">{data.location}</td>
                    <td data-label="Charge">{data.charge}</td>
                    <td data-label="Contact">{data.contact}</td>
                    <td data-label="Services">{data.services}</td>
                    <td data-label="Rating">{data.rating}</td>
                    <td data-label="Role">
                      <select
                        id={data._id}
                        defaultValue={data.role}
                        className="outline-none"
                        onChange={(event) => onChangeOption(event, data._id)}>
                        <option value={"admin"} label="Admin" />
                        <option value={"daycare"} label="Daycare" />
                      </select>
                    </td>
                    <td>
                      <button className="bg-orange-400 w-full items-center flex justify-center">
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
                  initialPage={1}
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
          <p>Loading</p>
        )}
      </section>
    </React.Fragment>
  );
};

Daycare.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default Daycare;
