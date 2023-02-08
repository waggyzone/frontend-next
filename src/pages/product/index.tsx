import Card from "@/component/Card/product";
import ProductService from "@/service/product";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { product } from "../types/types";


const Product: NextPage<{ data: [product] }> = ({ data }) => {
  console.log(data);
  const onEditProduct = (key: string | undefined) => {
    Router.push(`/product/edit/${key}`);
  };
  const onDeleteProduct = () => {};
  return (
    <div className="pt-32 w-screen">
      <Head>
        <title>Product</title>
      </Head>
      this is product
      <Link href="/product/add">Add product</Link>
      <div className=" container mx-auto grid grid-cols-2 gap-4">
        {Array.from(data).map((data) => (
          <Card
            key={data._id}
            title={data.name}
            brandname={data.name}
            price={data.price}
            onEdit={() => onEditProduct(data._id)}
            onDelete={onDeleteProduct}
          />
        ))}
      </div>
    </div>
  );
};


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const result = await ProductService.findAll().then((promise) => promise);
  return {
    props: {
      data: result 
    },
  };
};

export default Product;