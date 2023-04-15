import { apiClient } from "@/common/apiClient";

class CloudUploadService {
  upload = async (formData: any) =>
    await apiClient
      .post(`/file/upload`, formData)
      .then((promise) => promise.data)
      .catch((error) => {
        throw new Error(error);
      });
  removeUpladByPublicId = async (id: string) =>
    await apiClient
      .delete(`/file/${id}`)
      .then((promise) => promise.data)
      .catch((error) => {
        throw new Error(error);
      });
}

const cloudUploadService = new CloudUploadService();
export default cloudUploadService;
