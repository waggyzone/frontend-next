import cartService from "@/service/cart";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

const Cart: NextPage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      await cartService
        .findAllCartItems()
        .then((promise) => {
          setData(promise);
        })
        .catch((error) => {
          console.log("pri", error);
        });
    })();
  }, []);
  console.log(data);

  const getItemAmout = (count: number, amount: number) => count * amount;

  // const totalAmount = (_data: any) =>
  //   _data.reduce(accumulator, next) => accumulator + getItemAmout(next.count, next?.product_id?.price ?? next?.accessories_id?.price);
  const totalAmount = (_data: any[]) => {
    try {
      if (Array.from(_data).length !== 0) {
        return Array?.from(_data).reduce((accumulator, nextValue) => {
          accumulator =
            accumulator +
            getItemAmout(
              nextValue?.count,
              nextValue?.product_id?.price ?? nextValue?.accessories_id?.price
            );
          return accumulator;
        }, 0);
      }
    } catch (error) {
      throw error;
    }
  };

  const removeItem = async (id: string) => {
    await cartService.removeCartItemById(id).then((promise) => {
      if (promise.deletedCount === 1) {
        const _data = [...data];
        const result = _data.filter(
          (val: any) => val.product_id?._id !== id || val.accessories_id?._id !== id
        );
        setData(result);
      }
    });
  };

  // const onQuantityChanges = ()

  return (
    <div className="pt-32 w-screen">
      <Head>
        <title>Cart</title>
      </Head>
      <div className="container mx-auto">
        <div className="flex justify-between items-center pb-2">
          <span>Cart</span>
        </div>
        {data?.length !== 0 ? (
          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 text-black">
            <table className="table-auto w-full border-collapse bg-white text-left text-sm ">
              <thead className="bg-gray-400">
                <tr className="gap-5">
                  <th scope="col">Item Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {data?.map((_data: any, index) => (
                  // <Card title={_data?.product_id?.brandname ?? _data?.accessories_id?.name} />
                  <tr key={index} className="px-4 py-6 mx-4">
                    <td>{_data?.product_id?.brandname ?? _data?.accessories_id?.name}</td>
                    <td>{_data?.product_id?.price ?? _data?.accessories_id?.price}</td>
                    <td>{_data.count}</td>
                    <td>
                      {getItemAmout(
                        _data?.count,
                        _data?.product_id?.price ?? _data?.accessories_id?.price
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-4">
                        <button
                          x-data="{ tooltip: 'Delete' }"
                          onClick={() =>
                            removeItem(_data?.product_id?._id ?? _data?.accessories_id?._id)
                          }>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                            x-tooltip="tooltip">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td>Total</td>
                  <td></td>
                  <td></td>
                  <td>{totalAmount(data)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center text-3xl">
            <h1>No Item In Cart</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
