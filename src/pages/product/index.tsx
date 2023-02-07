import Card from "@/component/Card";
import ProductService from "@/service/product";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { product } from "../types/types";

const Product: NextPage<{ data: [product] }> = ({ data }) => {
  console.log(data);
  const onEditProduct = () => {};
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
            onEdit={onEditProduct}
            onDelete={onDeleteProduct}
          />
        ))}
      </div>
    </div>
  );
};

Product.getInitialProps = async (context) => {
  const result = await ProductService.findAll().then((promise) => promise);
  return { data: result };
};

export default Product;