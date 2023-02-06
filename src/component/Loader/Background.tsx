import Lottie from "lottie-react";
import React from "react";
import BackgroundAnimantionJson from "@/common/lottie/backgroud.json";
const Background: React.FC<{ className?: string }> = ({ className }) => {
  return <Lottie animationData={BackgroundAnimantionJson} as="div" className={className} />;
};

export default Background;
