import Lottie from "lottie-react";
import FourOhFourAnimationJson from "@/common/lottie/404.json";
import { NextPage } from "next";
import Router from "next/router";
// pages/404.tsx
const Custom404: NextPage = () => {
  const onButtonClick = () => Router.push("/");
  return (
    <div className="fourohfour">
      <Lottie animationData={FourOhFourAnimationJson} as="div" className="fourohfour__lottie" />
      <button className="fourohfour__button" onClick={() => onButtonClick()}>
        Back To Home
      </button>
    </div>
  );
};
export default Custom404;
