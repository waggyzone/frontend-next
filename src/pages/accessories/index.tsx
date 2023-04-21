import Card from "@/component/Card/accessories";
import AccessoriesService from "@/service/accessories";
import { GetServerSideProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { toast } from "react-hot-toast";
import { accessories } from "../types/types";
import cartService from "@/service/cart";

const Accessories: NextPage<{ data: [accessories] }> = ({ data }) => {
  const { status } = useSession();
  const onEditAccessories = (key: string | undefined) => {
    Router.push(`/accessories/edit/${key}`);
  };

  const refreshData = () => {
    Router.replace(Router.asPath);
  };

  const onDeleteAccessories = async (key: string | undefined) => {
    const result = await AccessoriesService.remove(key);
    if (result) {
      toast.success(result.name);
      refreshData();
    }
  };
  const onAddAccessories = async (id: string, qty: number) => {
    const data = {
      count: qty,
      accessories_id: id,
    };
    const result = await cartService.addProductToCart(data);
    if (result.count !== 0) {
      toast.success(`${result.count} Item added to cart`);
    }
  };
  return (
    <div className="pt-32 w-screen">
      <Head>
        <title>Accessories</title>
      </Head>
      <div className="container mx-auto">
        <div className="flex justify-between items-center pb-2">
          <span>Accessories</span>
          {status === "authenticated" ? (
            <Link
              href="/accessories/add"
              className="bg-blue-400 hover:bg-emerald-400 p-2 rounded-md">
              Create
            </Link>
          ) : null}
        </div>
        <div className=" grid grid-cols-2 gap-4">
          {Array.from(data).map((data) => (
            <Card
              key={data._id}
              id={data._id}
              title={data.name}
              size={data.size}
              price={data.price}
              color={data.color}
              image={data.image}
              onEdit={() => onEditAccessories(data._id)}
              onDelete={() => onDeleteAccessories(data._id)}
              onAdd={onAddAccessories}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const result = await AccessoriesService.findAll().then((promise) => promise);
  return {
    props: {
      data: result,
    },
  };
};

export default Accessories;
