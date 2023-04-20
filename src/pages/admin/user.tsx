import AdminLayout from "@/component/AdminLayout";
import Table from "@/component/Table";
import { useFetcher } from "@/hook/useFertcher";
import user from "@/service/user";
import Head from "next/head";
import React, { ReactElement, useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { mutate } from "swr";
const User = () => {
  const [userData, setUserData] = useState([]);

  const { data, isLoading, error } = user.getAllUser(3, 3);
  console.log("res", data);
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
        user.udpateUserById(id, data).then((result) => {
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
      <section className="w-full h-full">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Age</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading ? (
              data?.map((data: any) => (
                <tr key={data._id}>
                  <td data-label="Name">
                    {data.firstName} {data.lastName}
                  </td>
                  <td data-label="Username">{data.username}</td>
                  <td data-label="Age">{data.age}</td>
                  <td data-label="Role">
                    <select
                      id={data._id}
                      defaultValue={data.role}
                      className="outline-none"
                      onChange={(event) => onChangeOption(event, data._id)}>
                      <option value={"admin"} label="Admin" />

                      <option value={"user"} label="User" />
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>
                  <p>Loading</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </React.Fragment>
  );
};

User.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default User;
