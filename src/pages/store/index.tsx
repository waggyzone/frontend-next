import { NextPage } from "next";
import Card from "@/component/Card/store";
import React from "react";
import StoreService from "@/service/store";
import DogLoader from "@/component/Loader/DogLoader";
const Store: NextPage = () => {
  const { data, isLoading } = StoreService.getAll();
  return (
    <div>
      {isLoading ? (
        <div className="h-full flex justify-center items-center mt-0 pt-0">
          <DogLoader />
        </div>
      ) : (
        <div className="container mx-auto py-32">
          <div className=" grid grid-cols-2 gap-4">
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
        </div>
      )}
    </div>
  );
};

export default Store;
