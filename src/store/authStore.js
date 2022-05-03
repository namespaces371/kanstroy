import { Storage } from "@capacitor/storage";
import jwtInterceptor from "@/components/shared/jwtInterceptor";
import { jwtDecrypt } from "@/components/shared/helper";
const authStore = {
  namespaced: true,
  state: {
    OTPStatus: false,
    authData: {
      token: "",
      refreshToken: "",
      tokenExp: "",
      userInfo: {},
    },
  },
  getters: {
    getOTP(state) {
      return state.OTPCode;
    },
    getOTPStatus(state) {
      return state.OTPStatus;
    },
    getAuthData(state) {
      return state.authData;
    },
  },
  mutations: {
    saveAuthToken(state, payload) {
      if (payload.access_token) {
        const jwtDecodeUserInfo = jwtDecrypt(payload.access_token);
        const newAuthData = {
          token: payload.access_token,
          refreshToken: payload.refresh_token,
          tokenExp: jwtDecodeUserInfo.exp,
          userInfo: jwtDecodeUserInfo,
        };
        state.authData = newAuthData;
      }
    },
    saveLoginStatus(state, status) {
      state.OTPStatus = status;
    },
  },
  actions: {
    async sendOTP(_, payload) {
      try {
        const sendOTP = await jwtInterceptor.post("/auth/sendOTP", {
          phone: payload,
        });
        if (!sendOTP.error) return "sended";
      } catch (error) {
        console.log(error);
      }
    },
    async saveTokensToStorage({ commit }, payload) {
      await Storage.set({
        key: "access_token",
        value: payload.access_token,
      });
      await Storage.set({
        key: "refresh_token",
        value: payload.refresh_token,
      });
      commit("saveAuthToken", payload);
    },
    async loginUser({ commit, dispatch }, payload) {
      const loginUser = await jwtInterceptor.post("/auth/signin", {
        phone: payload[0],
        otpCode: payload[1],
      });
      if (loginUser.data.error) {
        commit("saveLoginStatus", "wrong");
      } else {
        const response = {
          access_token: loginUser.data.token,
          refresh_token: loginUser.data.refreshToken,
          userInfo: loginUser.data.validateSignin,
        };
        dispatch("saveTokensToStorage", response); //PROBLEM!!!!!!
        commit("saveLoginStatus", "success");
      }
    },
    async loadStorageTokens({ commit }) {
      const access_token = await Storage.get({ key: "access_token" });
      const refresh_token = await Storage.get({ key: "refresh_token" });
      if (access_token && refresh_token) {
        const tokenData = {
          access_token: access_token.value,
          refresh_token: refresh_token.value,
        };
        commit("saveAuthToken", tokenData);
      }
    },
  },
};
export default authStore;
