import AdminLayout from "@/component/AdminLayout";
import Head from "next/head";
import React, { ReactElement } from "react";

const Dashboard = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Admin</title>
      </Head>
      <section className="w-full h-full">hello</section>
    </React.Fragment>
  );
};

Dashboard.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default Dashboard;
