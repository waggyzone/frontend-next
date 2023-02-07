import Lottie from "lottie-react";
import React from "react";
import StraightLoaderAnimationJson from "@/common/lottie/Loader.json";
const StraightLoader: React.FC<{ className?: string }> = ({ className }) => {
  return <Lottie animationData={StraightLoaderAnimationJson} as="div" className={className} />;
};

export default StraightLoader;
