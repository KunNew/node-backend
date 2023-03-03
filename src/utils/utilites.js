import axios from "axios";
import store from "@/store";

const api = axios.create({
  baseURL: `https://node-backend-9eq1.onrender.com/api`,
  headers: {
    "content-type": "application/json",
    accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = store.state.auth.accessToken;
    config.headers[`Authorization`] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response.status === 401) {
//       console.log(error.response.status);
//       store.dispatch("auth/logout");

//     }
//     return Promise.reject(error);
//   }
// );
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if ([401].includes(error.response.status)) {
      // console.log(error.response.status);
      store.dispatch("auth/logout");
    } else {
      return Promise.reject(error);
    }
  }
);

export default api;
