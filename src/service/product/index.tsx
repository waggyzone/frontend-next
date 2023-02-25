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
        console.log(error);
        throw new Error(error);
      });
  findById = async (id: string) =>
    await apiClient
      .get(`/product/find/${id}`)
      .then((promise) => promise.data)
      .catch((error) => {
        throw new Error(error);
      });
  update = async (id: string, params: product) =>
    await apiClient
      .put(`/product/update/${id}`, params)
      .then((promise) => promise.data)
      .catch((error) => {
        throw new Error(error);
      });
  remove = async (id: string | undefined) =>
    await apiClient
      .delete(`/product/remove/${id}`)
      .then((promise) => promise.data)
      .catch((error) => {
        throw new Error(error);
      });
}

const productService = new ProductService();

export default productService;
