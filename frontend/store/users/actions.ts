export default {
  async fetchUsers({ commit }: any, payload: any): Promise<any> {
    try {
      commit("preloader/SET_IS_LOADING", true, { root: true });
      const response = await this.$axios.get("users");
      commit("SET_USERS", response.data);
    } catch (e) {
      commit("SET_USERS", []);
    } finally {
      commit("preloader/SET_IS_LOADING", false, { root: true });
    }
  },
};
