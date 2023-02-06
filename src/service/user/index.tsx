import { apiClient } from "@/common/apiClient";
import { createUser } from "@/pages/types/types";

class UserService {
  create = (data: createUser) =>
    apiClient
      .post(`/user/create`, data)
      .then((promise) => promise.data)
      .catch((error) => error);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();
