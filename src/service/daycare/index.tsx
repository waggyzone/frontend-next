import { apiClient } from "@/common/apiClient";
import { useFetcher } from "@/hook/useFertcher";
import { createDaycare, UserRoleUpdate, } from "@/pages/types/types";

class DaycareService {
  create = (data: createDaycare) =>
    apiClient
      .post(`/daycare/create`, data)
      .then((promise) => promise.data)
      .catch((error) => error);

  getAllDaycare = (page: number, limit: number) =>
    useFetcher(`${process.env.NEXT_PUBLIC_API_URL}/daycare/all/${page}/${limit}`);

  udpateDaycareById = (id: string, data: UserRoleUpdate) =>
    apiClient
      .put(`/daycare/update/${id}`, data)
      .then((promise) => promise.data)
      .catch((error) => error);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new DaycareService();
