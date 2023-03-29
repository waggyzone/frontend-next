import Card from "@/component/Card/accessories";
import cartService from "@/service/cart";
import { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";

const Cart: NextPage = () => {
  const[data,setData]=useState([]);
  useEffect(() => {
    (async () => {
    await cartService.findAllCartItems().then((promise) => {
      setData(promise)
    }).catch((error) => {
      console.log("pri", error)
    })
  })();
 },[])
  console.log(data)
  return (
    <div className="pt-32 w-screen">
      <Head>
        <title>Cart</title>
      </Head>
      <div className="container mx-auto">
        <div className="flex justify-between items-center pb-2">
          <span>Cart</span>
        </div>
        {data.map((_data,index) => (
         <Card />
       ))}
      </div>
    </div>
  );
};



 
export default Cart;
