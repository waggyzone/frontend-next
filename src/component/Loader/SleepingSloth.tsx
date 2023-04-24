import Lottie from "lottie-react";
import React from "react";
import CatAnimationJson from "@/common/lottie/sloteSleeping.json";
const SleepingSloth: React.FC<{ className?: string }> = ({ className }) => {
  return <Lottie animationData={CatAnimationJson} as="div" className={className} />;
};

export default SleepingSloth;
