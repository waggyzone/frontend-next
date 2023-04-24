import { MenuAsideItem } from "@/interfaces";
import {
  mdiAccount,
  mdiDoctor,
  mdiMonitor,
  mdiScissorsCutting,
  mdiStocking,
  mdiTable,
} from "@mdi/js";

export const menuAside: MenuAsideItem[] = [
  {
    href: "/admin",
    icon: mdiMonitor,
    label: "Dashboard",
  },
  // {
  //   href: "/admin/stock",
  //   icon: mdiStocking,
  //   label: "Stock",
  // },
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
  {
    href: "/admin/daycare",
    icon: mdiDoctor,
    label: "Daycare",
  },
  {
    href: "/admin/trainer",
    icon: mdiTable,
    label: "Trainer ",
  },
];
