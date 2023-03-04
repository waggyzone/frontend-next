import { apiClient } from "@/common/apiClient";
import { cart } from "@/pages/types/types";

class CartService {
  create = async (params: cart) =>
    await apiClient
      .post(`/cart/create`, params)
      .then((promise) => promise.data)
      .catch((error) => {
        throw new Error(error);
      });
  
  findById = async (id: string) =>
    await apiClient
      .get(`/product/find/${id}`)
      .then((promise) => promise.data)
      .catch((error) => {
        throw new Error(error);
      });
  update = async (id: string, params: cart) =>
    await apiClient
      .put(`/cart/update/${id}`, params)
      .then((promise) => promise.data)
      .catch((error) => {
        throw new Error(error);
      });
  remove = async (id: string | undefined) =>
    await apiClient
      .delete(`/cart/remove/${id}`)
      .then((promise) => promise.data)
      .catch((error) => {
        throw new Error(error);
      });
}

const cartService = new CartService();

export default CartService;
