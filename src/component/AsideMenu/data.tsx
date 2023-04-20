import { MenuAsideItem } from "@/interfaces";
import { mdiAccount, mdiMonitor, mdiScissorsCutting, mdiStocking } from "@mdi/js";

export const menuAside: MenuAsideItem[] = [
  {
    href: "/admin",
    icon: mdiMonitor,
    label: "Dashboard",
  },
  {
    href: "/admin/stock",
    icon: mdiStocking,
    label: "Stock",
  },
  {
    href: "/admin/user",
    icon: mdiAccount,
    label: "User",
  },
  {
    href: "/admin/grommer",
    icon: mdiScissorsCutting,
    label: "Grommer",
  },
];
