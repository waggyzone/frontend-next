import cartService from "@/service/cart";

const OrderHistory: React.FC = () => {
  const { data, isLoading } = cartService.findAllOrder();
  console.log("orders", data);

  const getItemAmout = (count: number, amount: number) => count * amount;

  // const totalAmount = (_data: any) =>
  //   _data.reduce(accumulator, next) => accumulator + getItemAmout(next.count, next?.product_id?.price ?? next?.accessories_id?.price);
  const totalAmount = (_data: any[]) => {
    try {
      return _data?.reduce((accumulator, nextValue) => {
        accumulator =
          accumulator +
          getItemAmout(
            nextValue?.count,
            nextValue?.product_id?.price ?? nextValue?.accessories_id?.price
          );
        return accumulator;
      }, 0);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      {!isLoading ? (
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 text-black">
          <table className="table-auto w-full border-collapse bg-white text-left text-sm ">
            <thead className="bg-gray-400">
              <tr className="gap-5">
                <th scope="col">Item Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((_data: any, index: number) => (
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
  );
};

export { OrderHistory };
