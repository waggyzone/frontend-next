import axios from "axios";
import { getSession } from "next-auth/react";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const apiClient = axios.create({
  baseURL,
  timeout: 30000,
});

apiClient.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session) {
    config.headers.Authorization = `Bearer ${session.user.access_token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error;

    if (response.status !== 401) {
      return Promise.reject(error);
    }

    // Use a 'clean' instance of axios without the interceptor to refresh the token. No more infinite refresh loop.
    // get("/auth/refresh", {
    //     baseURL,
    //     timeout: 30000,
    //     headers: {},
    //   })
    if (response.status === 401) {
      const session = await getSession();
      if (session) {
        return axios
          .get(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
            headers: {
              Authorization: `Bearer ${session?.user.refresh_token}`,
            },
          })
          .then((promise) => {
                        session.user.access_token = promise.data.access_token;
                        //@ts-ignore
                        session.user.refresh_token = promise.data.access_token;
                        //@ts-ignore
                        session.user.role = promise.data.role;
                        session.user.name =promise.data.name;
            config.headers.Authorization = `Bearer ${promise.data.user.access_token}`;
            return apiClient(config);
          })
          .catch(() => {
            return Promise.reject(error);
          });
      }
    }

    return Promise.resolve();
  }
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
