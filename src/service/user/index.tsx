import { apiClient } from "@/common/apiClient";
import { useFetcher } from "@/hook/useFertcher";
import { UpdateUser, UserRoleUpdate, createUser } from "@/pages/types/types";

class UserService {
  findUser = () => {
    return useFetcher(`${process.env.NEXT_PUBLIC_API_URL}/user`);
  };
  findAllUser = () => {
    return useFetcher(`${process.env.NEXT_PUBLIC_API_URL}/user/all`);
  };
  create = (data: createUser) =>
    apiClient
      .post(`/user/create`, data)
      .then((promise) => promise.data)
      .catch((error) => error);

  getAllUser = (page: number, limit: number) =>
    useFetcher(`${process.env.NEXT_PUBLIC_API_URL}/user/all/${page}/${limit}`);

  udpateUserById = (data: UpdateUser | UserRoleUpdate) =>
    apiClient
      .put(`/user/update`, data)
      .then((promise) => promise.data)
      .catch((error) => error);
  modifyUserById = (id: string, data: UpdateUser | UserRoleUpdate) =>
    apiClient
      .put(`/user/update/${id}`, data)
      .then((promise) => promise.data)
      .catch((error) => error);

  removeUserById = (id: string) =>
    apiClient
      .delete(`/user/remove/${id}`)
      .then((promise) => promise.data)
      .catch((error) => error);

  clearCache = (token: string) =>
    apiClient
      .post("/auth/logout", { token })
      .then((promise) => promise.data)
      .catch((error) => error);
}

export default new UserService();
