import cartService from "@/service/cart";
import { atom, selector } from "recoil";

const cartCountState = atom({
  key: "cartCountState",
  default: 0,
});
