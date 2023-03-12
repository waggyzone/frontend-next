import Axios from "axios";
import { getSession } from "next-auth/react";

const apiClient = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

apiClient.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session) {
    config.headers.Authorization = `Bearer ${session.user.access_token}`;
  }
  return config;
});

// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     throw error;
//   }
// );

apiClient.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const session = await getSession();
    const originalConfig = err.config;
    console.log(err.config);
    if (originalConfig.url !== "/auth/login/*" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await Axios.post("/auth/refresh", {
            headers: {
              Authorization: `Bearer ${session.user.refresh_token}`,
            },
          });
    
          //@ts-ignore
          session.user.access_token = rs.data.access_token;
          //@ts-ignore
          session.user.refresh_token = rs.data.access_token;
          //@ts-ignore
          session.user.role = rs.data.role;

          localStorage.setItem("refresh-token", rs.data.refresh_token);

          return apiClient(originalConfig);
        } catch (_error) {
          // Redirecting the user to the landing page
          window.location.href = window.location.origin;
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export { apiClient };
