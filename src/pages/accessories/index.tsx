import Card from "@/component/Card";
import AccessoriesService from "@/service/product";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { accessories } from "../types/types";


const Accessories: NextPage<{ data: [accessories] }> = ({ data }) => {
  console.log(data);
  const onEditAccessories = (key: string | undefined) => {
    Router.push(`/accessories/edit/${key}`);
  };
  const onDeleteAccessories = () => {};
  return (
    <div className="pt-32 w-screen">
      <Head>
        <title>Accessories</title>
      </Head>
      this is Accessories 
      <Link href="/accessories/add">Add Accessories</Link>
      <div className=" container mx-auto grid grid-cols-2 gap-4">
        {Array.from(data).map((data) => (
          <Card
            key={data._id}
            title={data.name}
            size={data.size}
            price={data.price}
            color={data.color}
            onEdit={() => onEditAccessories(data._id)}
            onDelete={onDeleteAccessories}
          />
        ))}
      </div>
    </div>
  );
};


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const result = await AccessoriesService.findAll().then((promise) => promise);
  return {
    props: {
      data: result 
    },
  };
};

export default Accessories;