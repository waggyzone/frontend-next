import cartService from "@/service/cart";
import { atom, selector } from "recoil";
import { date } from "yup";

const cartCountState = atom({
  key: "cartCountState",
  default: 0,
});

const cartAllItemCount = selector({
  key: "cartAllItemCount",
  get: ({ get }) => {
    const { data, isLoading, error } = cartService.findAllCartItemsCount();

    return get(cartCountState);
  },
  set: ({ set }, newValue) => set(cartCountState, newValue),
});

export { cartCountState, cartAllItemCount };
