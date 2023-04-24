import { apiClient } from "@/common/apiClient";
import { useFetcher } from "@/hook/useFertcher";
import { UserRoleUpdate,createTrainer } from "@/pages/types/types";

class TrainerService {
  create = (data: createTrainer) =>
    apiClient
      .post(`/trainer/create`, data)
      .then((promise) => promise.data)
      .catch((error) => error);

  getAllTrainer = (page: number, limit: number) =>
    useFetcher(`${process.env.NEXT_PUBLIC_API_URL}/trainer/all/${page}/${limit}`);

  udpateTrainerById = (id: string, data: UserRoleUpdate) =>
    apiClient
      .put(`/trainer/update/${id}`, data)
      .then((promise) => promise.data)
      .catch((error) => error);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new TrainerService();
