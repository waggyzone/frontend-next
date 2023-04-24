import { apiClient } from "@/common/apiClient";
import { useFetcher } from "@/hook/useFertcher";
import { createGroomer } from "@/pages/types/types";

class GroomerService {
  findGroomer = () => {
    return useFetcher(`${process.env.NEXT_PUBLIC_API_URL}/groomer/all`);
  };
  create = (data: createGroomer) =>
    apiClient
      .post(`/groomer/create`, data)
      .then((promise) => promise.data)
      .catch((error) => error);

  getAllGroomerByPage = (page: number, limit: number) =>
    useFetcher(`${process.env.NEXT_PUBLIC_API_URL}/groomer/all/${page}/${limit}`);

  udpateGroomerById = (id: string, data: createGroomer) =>
    apiClient
      .put(`/groomer/update/${id}`, data)
      .then((promise) => promise.data)
      .catch((error) => error);
  removeUserById = (id: string) =>
    apiClient
      .delete(`/groomer/remove/${id}`)
      .then((promise) => promise.data)
      .catch((error) => error);
}

export default new GroomerService();
