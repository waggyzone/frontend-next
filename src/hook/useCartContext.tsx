import { Context } from "@/context/waggyContext";
import { useContext } from "react";

export default function useCartContext() {
  const context = useContext(Context);
  if (!context) {
    return "context is not available";
  }
  return context;
}
