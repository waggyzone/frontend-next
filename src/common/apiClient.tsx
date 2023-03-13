import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { getSession } from "next-auth/react";

const onRequest = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
  const session = await getSession();
  if (session) {
    //@ts-ignore
    config.headers["Authorization"] = `Bearer ${session.user.access_token}`;
  }
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  if (error.response) {
    // Access Token was expired
    if (error.response.status === 401) {
      try {
        const session = await getSession();
        const rs = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {
            user: session?.user,
          },
          {
            headers: {
              Authorization: `Bearer ${session?.user.refresh_token}`,
            },
          }
        );
        if (session) {
          session.user.access_token = rs.data.access_token;
          //@ts-ignore
          session?.user.refresh_token = <rs className="data refresh_token"></rs>;
          //@ts-ignore
          session.user.role = rs.data.role;
        }

        return error;
      } catch (_error) {
        return Promise.reject(_error);
      }
    }
  }
  return Promise.reject(error);
};

const setupInterceptorsTo = (axiosInstance: AxiosInstance): AxiosInstance => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
};

const apiClient = setupInterceptorsTo(
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  })
);

export { apiClient };

// import Axios from "axios";
// import { getSession } from "next-auth/react";

// const apiClient = Axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
// });

// apiClient.interceptors.request.use(async (config) => {
//   const session = await getSession();
//   if (session) {
//     config.headers.Authorization = `Bearer ${session.user.access_token}`;
//   }
//   return config;
// });

// // apiClient.interceptors.response.use(
// //   (response) => response,
// //   (error) => {
// //     throw error;
// //   }
// // );

// apiClient.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   async (err) => {
//     const session = await getSession();
//     if (session !== null) {
//       const originalConfig = err.config;
//       console.log(err.config);
//       if (originalConfig.url !== "/auth/login/*" && err.response) {
//         // Access Token was expired
//         if (err.response.status === 401 || !originalConfig._retry) {
//           originalConfig._retry = true;
//           try {
//             // const rs = await Axios.post("/auth/refresh", {
//             //   headers: {
//             //     Authorization: `Bearer ${session?.user.refresh_token}`,
//             //   },
//             // });
//             console.log(session?.user.refresh_token);
//             const rs = await Axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
//               headers: {
//                 Authorization: `Bearer ${session?.user.refresh_token}`,
//               },
//             });

//             //@ts-ignore
//             session.user.access_token = rs.data.access_token;
//             //@ts-ignore
//             session.user.refresh_token = rs.data.access_token;
//             //@ts-ignore
//             session.user.role = rs.data.role;

//             localStorage.setItem("refresh-token", rs.data.refresh_token);

//             return apiClient(originalConfig);
//           } catch (_error) {
//             // Redirecting the user to the landing page
//             window.location.href = window.location.origin;
//             return Promise.reject(_error);
//           }
//         }
//       }
//     }

//     return Promise.reject(err);
//   }
// );

// export { apiClient };
