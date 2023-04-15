import { apiClient } from "@/common/apiClient";
import { cart } from "@/pages/types/types";
import { promises } from "dns";
class CartService {
  addProductToCart = async (data: any) => {
    return apiClient
      .post(`/cart/create`, data)
      .then((promise) => promise.data)
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
  };
  findAllCartItems = async () =>
    await apiClient
      .get(`/cart/find`)
      .then((promise) => {
        if (promise !== undefined) {
          return promise.data;
        }
      })
      .catch((error) => {
        console.log("cart", error);
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
  removeCartItemById = async (id: string | undefined) =>
    await apiClient
      .delete(`/cart/remove/item/${id}`)
      .then((promise) => promise.data)
      .catch((error) => {
        throw new Error(error);
      });
}

const cartService = new CartService();

export default cartService;
