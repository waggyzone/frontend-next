import { ReactNode, Suspense } from "react";
import AsideMenu from "../AsideMenu";

const AdminLayout: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <div className={`overflow-hidden lg:overflow-visible  bg-gray-50`}>
      <div className="w-screen flex justify-between flex-row">
        <div className=" flex-[0.125] h-screen">
          <AsideMenu />
        </div>
        <div className="flex-[0.875]">
          <Suspense fallback={<p>Loading</p>}>{children}</Suspense>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
