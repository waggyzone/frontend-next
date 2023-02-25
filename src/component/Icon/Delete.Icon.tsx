import DeleteJson from "@/common/lottie/Delete.json";
import Lottie from "lottie-react";
import { useRef } from "react";
const DeleteIcon: React.FC<{ className?: string }> = ({ className }) => {
  const lottieRef = useRef(null);
  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={DeleteJson}
      as="div"
      className={className}
      loop={true}
      autoplay={false}
      onMouseEnter={() => lottieRef?.current.goToAndPlay(0, true)}
      onMouseLeave={() => lottieRef?.current.goToAndStop(0, true)}
    />
  );
};

export default DeleteIcon;
