import { apiClient } from "@/common/apiClient";
class CartService {
  addProductToCart = async (data: any) => {
    apiClient
      .post(`/cart/create`, data)
      .then((promise) => promise.data)
      .catch((error) => {
        throw new Error(error);
      });
  };
}

const cartService = new CartService();

export default cartService;
