import { apiClient } from "@/common/apiClient";
import { useFetcher } from "@/hook/useFertcher";
import { cart, store } from "@/pages/types/types";

class StoreService {
  create = async (params: store) =>
    await apiClient
      .post(`/pet-details/create`, params)
      .then((promise) => promise.data)
      .catch((error) => {
        throw new Error(error);
      });
  getAll = () => useFetcher(`${process.env.NEXT_PUBLIC_API_URL}/pet-details/all`);
}

export default new StoreService();
