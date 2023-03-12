 import { apiClient } from "@/common/apiClient";
import { cart } from "@/pages/types/types";
 class CartService {
  addProductToCart = async (params: cart) => {
     await apiClient
       .post(`/cart/create`,params)
      .then((promise) => promise.data)
      .catch((error) => {
         throw new Error(error);
       });
   };
 }

 const cartService = new CartService();

 export default cartService;
