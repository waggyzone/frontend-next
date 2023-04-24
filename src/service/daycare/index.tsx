import { apiClient } from "@/common/apiClient";
import { useFetcher } from "@/hook/useFertcher";
import { createDaycare } from "@/pages/types/types";

class DayCareService {
  findDaycare = () => {
    return useFetcher(`${process.env.NEXT_PUBLIC_API_URL}/daycare/all`);
  };
  create = (data: createDaycare) =>
    apiClient
      .post(`/daycare/create`, data)
      .then((promise) => promise.data)
      .catch((error) => error);

  getAllDaycareByPage = (page: number, limit: number) =>
    useFetcher(`${process.env.NEXT_PUBLIC_API_URL}/daycare/all/${page}/${limit}`);

  udpateDaycareById = (id: string, data: createDaycare) =>
    apiClient
      .put(`/daycare/update/${id}`, data)
      .then((promise) => promise.data)
      .catch((error) => error);
  removeUserById = (id: string) =>
    apiClient
      .delete(`/daycare/remove/${id}`)
      .then((promise) => promise.data)
      .catch((error) => error);
}

export default new DayCareService();
