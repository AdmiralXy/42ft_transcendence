export default {
  async fetchFriends({ commit }: any, payload: any): Promise<any> {
    console.log("fetchFriends");
    try {
      commit("preloader/SET_IS_LOADING", true, { root: true });
      const response = await this.$axios.get("friends/" + payload.id);
      commit("SET_FRIENDS", response.data);
    } catch (e) {
      console.log(e);
      commit("SET_FRIENDS", []);
    } finally {
      commit("preloader/SET_IS_LOADING", false, { root: true });
    }
  },
  async addFriend({ commit }: any, payload: any): Promise<any> {
    try {
      commit("preloader/SET_IS_LOADING", true, { root: true });
      const response = await this.$axios.post(
        "friends/" + payload.id + "/add/" + payload.friendId
      );
    } finally {
      commit("preloader/SET_IS_LOADING", false, { root: true });
    }
  },
  async removeFriend({ commit }: any, payload: any): Promise<any> {
    try {
      commit("preloader/SET_IS_LOADING", true, { root: true });
      const response = await this.$axios.delete(
        "friends/" + payload.id + "/delete/" + payload.friendId
      );
    } finally {
      commit("preloader/SET_IS_LOADING", false, { root: true });
    }
  },
};
