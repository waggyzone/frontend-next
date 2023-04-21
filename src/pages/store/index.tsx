import { NextPage } from "next";
import Card from "@/component/Card/store";
import React from "react";
import StoreService from "@/service/store";
const Store: NextPage = () => {
  const { data, isLoading } = StoreService.getAll();
  return (
    <div className="pt-32">
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <div className="container mx-auto space-y-3">
          {data?.map((_data: any, index) => (
            <Card
              key={index}
              title={_data.name}
              id={_data.id}
              name={_data.name}
              breed={_data.breed}
              dob={_data.dob}
              image={_data.image}
              price={_data.price}
              owner={_data.owner_id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Store;
