import jwtInterceptor from "@/components/shared/jwtInterceptor";

const userStore = {
  namespaced: true,
  state: {
    userData: {},
  },
  getters: {
    getUserObject(state) {
      return state.userData;
    },
  },
  mutations: {
    setUserdata(state, payload) {
      state.userData = payload;
    },
    setUserField(state, [field, val]) {
      state.userData[field] = val;
    },
  },
  actions: {
    async getUser({ commit }, user_id) {
      const userDataFetch = await jwtInterceptor.get(`/user/${user_id}`);
      if (!userDataFetch.error)
        return commit("setUserdata", userDataFetch.data.result);
    },
    async updateUser({ commit }, payload) {
      const updateFetch = await jwtInterceptor.put("/user", {
        user_id: payload.user_id,
        userData: payload.userData,
      });
      if (!updateFetch.error) {

        Object.keys(payload.userData).map((key) => {
          commit("setUserField", [key, payload.userData[key]]);
        });

        return updateFetch.data;
      } else {
        return { status: "wrong" };
      }
    },
  },
};
export default userStore;
