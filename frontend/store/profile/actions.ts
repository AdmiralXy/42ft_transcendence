export default {
  async fetchUserProfile({ commit }: any, payload: any): Promise<any> {
    try {
      const response = await this.$axios.get("user/" + payload.id);
      commit("SET_USER", response.data);
    } catch (e) {
      commit("SET_USER", {});
    }
  },
  async updateUserProfile({ commit }: any, { id, data }: any): Promise<any> {
    return await this.$axios.patch("user/" + id, data);
  },
};
