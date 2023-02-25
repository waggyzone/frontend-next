import EditJson from "@/common/lottie/Edit.json";
import Lottie from "lottie-react";
import { useRef } from "react";
const EditIcon: React.FC<{ className?: string }> = ({ className }) => {
  const lottieRef = useRef(null);

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={EditJson}
      as="div"
      className={className}
      loop={true}
      autoplay={false}
      onMouseEnter={() => lottieRef?.current.goToAndPlay(0, true)}
      onMouseLeave={() => lottieRef?.current.goToAndStop(0, true)}
    />
  );
};

export default EditIcon;
