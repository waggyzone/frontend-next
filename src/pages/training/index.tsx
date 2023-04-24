import BaseIcon from "@/component/BaseIcon";
import DogLoader from "@/component/Loader/DogLoader";
import Groomer from "@/service/Groomer";
import Trainer from "@/service/Trainer";
import { mdiStar } from "@mdi/js";
import { GetServerSideProps, NextPage } from "next";

const Training: NextPage = () => {
  const { data, isLoading } = Trainer.findGTrainer();

  return (
    <div className=" w-screen h-screen container mx-auto pt-20">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <DogLoader />
        </div>
      ) : (
        <div className="space-y-3 ">
          {data.map((data: any) => (
            <div className="w-full p-2 bg-slate-50 rounded-md shadow-md grid grid-cols-6 ">
              <div>{data.name}</div>
              <div>{data.location}</div>
              <div>{data.services}</div>
              <div>{data.charge}</div>
              <div>{data.contact}</div>
              <div>
                {[...Array(data.rating)].map((_, index) => (
                  <BaseIcon path={mdiStar} w="w-10" h="h-10" />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Training;
