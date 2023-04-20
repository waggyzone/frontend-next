import { apiClient } from "@/common/apiClient";
import { useFetcher } from "@/hook/useFertcher";
import { UserRoleUpdate, createUser } from "@/pages/types/types";

class UserService {
  create = (data: createUser) =>
    apiClient
      .post(`/user/create`, data)
      .then((promise) => promise.data)
      .catch((error) => error);

  getAllUser = (page: number, limit: number) =>
    useFetcher(`${process.env.NEXT_PUBLIC_API_URL}/user/all/${page}/${limit}`);

  udpateUserById = (id: string, data: UserRoleUpdate) =>
    apiClient
      .put(`/user/update/${id}`, data)
      .then((promise) => promise.data)
      .catch((error) => error);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();
