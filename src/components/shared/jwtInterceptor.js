import axios from "axios";
import store from '@/store/index'
 
const jwtInterceptor = axios.create({
  baseURL: 'http://192.168.8.102:3000'
});
 
jwtInterceptor.interceptors.request.use((config) => {
  const authData = store.getters["as/getAuthData"];
  if (authData == null) {
    return config;
  }
 
  config.headers.common["authorization"] = authData.token;
  return config;
});
 
jwtInterceptor.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      const authData = store.getters["as/getAuthData"];
      const payload = {
        access_token: authData.token,
        refresh_token: authData.refreshToken,
      };
 
      const response = await axios.post(
        "http://localhost:3000/auth/refreshtoken",
        payload
      );
      await store.dispatch("as/saveTokensToStorage", response.data);
      error.config.headers[
        "authorization"
      ] = response.data.access_token;
      return axios(error.config);
    } else {
      return Promise.reject(error);
    }
  }
);
 
export default jwtInterceptor;