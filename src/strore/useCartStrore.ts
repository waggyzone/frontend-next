import { count } from "console";
import { create } from "zustand";

const useCartStore = create((set) => ({
  count: 0,
  inc: () => set((state: any) => ({ count: state.count + 1 })),
  totalItem: (val: number) =>
    set((state: any) => ({
      count: state.count + val,
    })),
}));
export default useCartStore;
