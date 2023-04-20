import { useSession } from "next-auth/react";
import MenuItem from "./MenuItem";
import { menuAside } from "./data";

const AsideMenu: React.FC = () => {
  const { data: session, status } = useSession();
  return (
    <aside className="fixed lg:py-2 lg:pl-2 w-40 left-0 top-0 h-screen transition-position overflow-hidden">
      <div className="flex-1 overflow-y-auto overflow-x-hidden lg:rounded-2xl bg-white  !w-full h-screen">
        <div> {session?.user.name ?? "Guest"}</div>
        {Array.from(menuAside).map((data, index) => (
          <MenuItem item={data} key={index} />
        ))}
      </div>
    </aside>
  );
};

export default AsideMenu;
