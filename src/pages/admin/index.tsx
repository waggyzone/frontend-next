import AdminLayout from "@/component/AdminLayout";
import Head from "next/head";
import React, { ReactElement } from "react";
import UserService from "@/service/user";
import BaseIcon from "@/component/BaseIcon";
import { mdiAccountMultiple } from "@mdi/js";
import cartService from "@/service/cart";
import productService from "@/service/product";

const Dashboard = () => {
  const { data: userData } = UserService.findAllUser();
  console.log("useDA", userData);
  return (
    <React.Fragment>
      <Head>
        <title>Admin</title>
      </Head>
      <section className="w-full h-full ">
        <div className="container mx-auto pt-10">
          <div className="bg-white shadow-md w-32 h-28 rounded-md flex flex-col justify-center items-center">
            <label>User</label>
            <BaseIcon path={mdiAccountMultiple} className="flex-none bg-green" w="w-40" size="40" />
            <span> {userData?.length}</span>
          </div>
          <div className="bg-white shadow-md w-32 h-28 rounded-md flex flex-col justify-center items-center">
            <label>User</label>
            <BaseIcon path={mdiAccountMultiple} className="flex-none bg-green" w="w-40" size="40" />
            <span> {0}</span>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

Dashboard.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default Dashboard;
