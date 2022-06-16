export default {
  async fetchUserProfile({ commit }: any, payload: any): Promise<any> {
    try {
      commit("preloader/SET_IS_LOADING", true, { root: true });
      const response = await this.$axios.get("users/" + payload.id);
      commit("SET_USER", response.data);
    } catch (e) {
      commit("SET_USER", {});
    } finally {
      commit("preloader/SET_IS_LOADING", false, { root: true });
    }
  },
  async updateUserProfile({ commit }: any, { id, data }: any): Promise<any> {
    return await this.$axios.patch("users/" + id, data);
  },
};
