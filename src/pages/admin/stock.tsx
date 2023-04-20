import AdminLayout from "@/component/AdminLayout";
import Head from "next/head";
import React, { ReactElement } from "react";

const Stock = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Admin</title>
      </Head>
      <section className="w-full h-full">stock page</section>
    </React.Fragment>
  );
};

Stock.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default Stock;
