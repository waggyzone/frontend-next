import CartJson from "@/common/lottie/Kart.json";
import Lottie from "lottie-react";
import { useRef } from "react";
const CartIcon: React.FC<{ className?: string }> = ({ className }) => {
  const lottieRef = useRef(null);

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={CartJson}
      as="div"
      className={className}
      loop={true}
      autoplay={false}
      onMouseEnter={() => lottieRef?.current.goToAndPlay(0, true)}
      onMouseLeave={() => lottieRef?.current.goToAndStop(0, true)}
    />
  );
};

export default CartIcon;
