import { NextPage } from "next";
import Card from "@/component/Card/store";
import React, { useState } from "react";
import StoreService from "@/service/store";
import DogLoader from "@/component/Loader/DogLoader";
import Search from "@/component/Search";
const categories = [
  { label: "All", value: "" },
  { label: "Name", value: "name" },
  { label: "Breed name", value: "breed" },
  { label: "Price", value: "price" },
];
const Store: NextPage = () => {
  const { data, isLoading } = StoreService.getAll();
  const [resultData, setResultData] = useState(data);
  const onSearch = (filterValue: string, value: string) => {
    if (value) {
      const result = data.filter((val) => {
        if (filterValue === "name") {
          return val.name.toLowerCase().includes(value.toLowerCase());
        }
        if (filterValue === "brandname") {
          return val.brandname.toLowerCase().includes(value.toLowerCase());
        }
        if (filterValue === "price") {
          return val.price === Number(value);
        }
        return val.name.toLowerCase().includes(value.toLowerCase());
      });
      console.log("resu", result);
      setResultData(result);
    } else {
      setResultData(data);
    }
  };
  return (
    <div>
      {isLoading ? (
        <div className="h-full flex justify-center items-center mt-0 pt-0">
          <DogLoader />
        </div>
      ) : (
        <div className="container mx-auto py-32">
          <div>
            <Search
              placeHolder="Seach by Name ,Brand Name and Price"
              filterData={categories}
              onSearchClik={onSearch}
            />
          </div>
          <div className=" grid grid-cols-2 gap-4">
            {resultData?.map((_data: any, index: number) => (
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
