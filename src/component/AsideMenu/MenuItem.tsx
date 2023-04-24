import { MenuAsideItem } from "@/interfaces";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BaseIcon from "../BaseIcon";
import Link from "next/link";

const MenuItem: React.FC<{ item?: MenuAsideItem }> = ({ item, ...restProps }) => {
  const [isLinkActive, setIsLinkActive] = useState(false);
  const { asPath, isReady } = useRouter();

  useEffect(() => {
    if (item?.href && isReady) {
      const linkPathName = new URL(item.href, location.href).pathname;
      const activePathName = new URL(asPath, location.href).pathname;
      setIsLinkActive(linkPathName === activePathName);
    }
  }, [item?.href, isReady, asPath]);

  return (
    <div
      key={restProps?.key}
      className={`  cursor-pointer bg-white ${
        isLinkActive ? "text-black" : "text-blue-600"
      } rounded-sm hover:text-black p-2  w-auto  `}>
      {item?.href ? (
        <Link href={item.href} className="w-full items-center flex justify-between">
          {item?.icon ? (
            <BaseIcon path={item.icon} className="flex-none" w="w-11" size="18" />
          ) : null}
          <span className={`grow text-ellipsis line-clamp-1`}>{item?.label}</span>
        </Link>
      ) : null}
    </div>
  );
};

export default MenuItem;
