import { apiClient } from "@/common/apiClient";
import { accessories } from "@/pages/types/types";

class AccessoriesService {
  create = async (params: accessories) =>
    await apiClient
      .post(`/accessories/create`, params)
      .then((promise) => promise.data)
      .catch((error) => {
        throw new Error(error);
      });
  findAll = async () =>
    await apiClient
      .get(`/accessories/all`)
      .then((promise) => promise.data)
      .catch((error) => {
        throw new Error(error);
      });
  findById = async (id: string) =>
    await apiClient
      .get(`/accessories/find/${id}`)
      .then((promise) => promise.data)
      .catch((error) => {
        throw new Error(error);
      });
  update = async (id: string, params: accessories) =>
    await apiClient
      .put(`/accessories/update/${id}`, params)
      .then((promise) => promise.data)
      .catch((error) => {
        throw new Error(error);
      });
}

const accessoriesService = new AccessoriesService();

export default accessoriesService;
