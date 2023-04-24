import { apiClient } from "@/common/apiClient";
import { useFetcher } from "@/hook/useFertcher";
import { createTrainer } from "@/pages/types/types";

class TrainerService {
  findGTrainer = () => {
    return useFetcher(`${process.env.NEXT_PUBLIC_API_URL}/trainer/all`);
  };
  create = (data: createTrainer) =>
    apiClient
      .post(`/trainer/create`, data)
      .then((promise) => promise.data)
      .catch((error) => error);

  getAllTrainerByPage = (page: number, limit: number) =>
    useFetcher(`${process.env.NEXT_PUBLIC_API_URL}/trainer/all/${page}/${limit}`);

  udpateTrainerById = (id: string, data: createTrainer) =>
    apiClient
      .put(`/trainer/update/${id}`, data)
      .then((promise) => promise.data)
      .catch((error) => error);
  removeUserById = (id: string) =>
    apiClient
      .delete(`/trainer/remove/${id}`)
      .then((promise) => promise.data)
      .catch((error) => error);
}

export default new TrainerService();
