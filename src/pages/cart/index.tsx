import Card from "@/component/Card/cart";
import CartService from "@/service/cart";
import { GetServerSideProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { toast } from "react-hot-toast";
import { cart } from "../types/types";

const Cart: NextPage<{ data: [cart] }> = ({ data }) => {
  const { status } = useSession();
  const onEditCart = (key: string | undefined) => {
    Router.push(`/cart/edit/${key}`);
  };

  const refreshData = () => {
    Router.replace(Router.asPath);
  };

  const onDeleteCart= async (key: string | undefined) => {
    const result = await cartService.remove(key);
    if (result) {
      toast.success(result.name);
      refreshData();
    }
  };
  return (
    <div className="pt-32 w-screen">
      <Head>
        <title>Cart</title>
      </Head>
      <div className="container mx-auto">
        <div className="flex justify-between items-center pb-2">
          <span>Cart</span>
          {status === "authenticated" ? (
            <Link href="/accessories/add" className="bg-blue-400 hover:bg-emerald-400 p-2 rounded-md">
              Create
            </Link>
          ) : null}
        </div>
        <div className=" grid grid-cols-2 gap-4">
          {Array.from(data).map((data) => (
            <Card
              key={data.id}
              status={data.status}
              count={data.count}
              color={data.color}
              onEdit={() => onEditCart(data._id)}
              onDelete={() => onDeleteCart(data._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const result = await CartService.findAll().then((promise) => promise);
  return {
    props: {
      data: result,
    },
  };
};

export default Cart;
