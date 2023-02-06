import { apiClient } from "@/common/apiClient";
import { product } from "@/pages/types/types";

class ProductService {
  create = async (params: product) =>
    await apiClient
      .post(`/product/create`, params)
      .then((promise) => promise.data)
      .catch((error) => {
        throw new Error(error);
      });
  findAll = async () =>
    await apiClient
      .get(`/product/all`)
      .then((promise) => promise.data)
      .catch((error) => {
        throw new Error(error);
      });
}

export default new ProductService();
