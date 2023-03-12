import Card from "@/component/Card/product";
import cartService from "@/service/cart";
import ProductService from "@/service/product";
import { GetServerSideProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { toast } from "react-hot-toast";
import { product } from "../types/types";

const Product: NextPage<{ data: [product] }> = ({ data }) => {
  const { status } = useSession();

  const onEditProduct = (key: string | undefined) => {
    Router.push(`/product/edit/${key}`);
  };

  const refreshData = () => {
    Router.replace(Router.asPath);
  };

  const onDeleteProduct = async (key: string | undefined) => {
    const result = await ProductService.remove(key);
    if (result) {
      toast.success(result.name);
      refreshData();
    }
  };
  const onAddProduct = async(_id: string, quantity: number) => {
    console.log("vannu", { _id, quantity });

const data = JSON.stringify({
      count: quantity,
      product_id: _id,
    });
    const result = await cartService.addProductToCart(data);
    console.log("result", result);
  };

  return (
    <div className="pt-32 w-screen">
      <Head>
        <title>Product</title>
      </Head>
      <div className="container mx-auto">
        <div className="flex justify-between items-center pb-2">
          <span>Product</span>
          {status === "authenticated" ? (
            <Link href="/product/add" className="bg-blue-400 hover:bg-emerald-400 p-2 rounded-md">
              Create
            </Link>
          ) : null}
        </div>
        <div className=" grid grid-cols-2 gap-4">
          {Array.from(data).map((data) => (
            <Card
              id={data._id}
              title={data.name}
              brandname={data.brandname}
              price={data.price}
              onEdit={() => onEditProduct(data._id)}
              onDelete={() => onDeleteProduct(data._id)}
              onAdd={onAddProduct}>
              <div>
                {/* <div>
                  <input type="number" step="1" min={1} className="bg-orange-500" />
                </div> */}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const result: product = await ProductService.findAll().then((promise) => promise);
  return {
    props: {
      data: result,
    },
  };
};

export default Product;
