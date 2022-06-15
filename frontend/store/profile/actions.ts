export default {
  async fetchUserProfile({ commit }: any, payload: any): Promise<any> {
    try {
      const response = await this.$axios.get("profile/" + payload.login);
      commit("SET_USER", response.data);
    } catch (e) {
      commit("SET_USER", {});
    }
  },
  async updateUserProfile({ commit }: any, { id, data }: any): Promise<any> {
    return await this.$axios.patch("profile/" + id, data);
  },
};
