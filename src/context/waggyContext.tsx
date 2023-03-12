import { createContext, useState } from "react";

export type ContextType = {
  cart: number;
};

export const initialValules = {
  cart: 0,
};

export const Context = createContext<ContextType>(initialValules);

export const StateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState(0);
  const _value = { cart, setCart };
  return <Context.Provider value={_value}>{children}</Context.Provider>;
};

export default StateProvider;
