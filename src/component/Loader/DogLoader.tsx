//@ts-check
import Lottie from "lottie-react";
import React from "react";
import DogAnimationJson from "@/common/lottie/dog.json";
const DogLoader: React.FC = () => {
  return (
    <Lottie
      animationData={DogAnimationJson}
      as="div"
      className="w-[50rem] h-[50rem] flex justify-center items-center"
    />
  );
};

export default DogLoader;
