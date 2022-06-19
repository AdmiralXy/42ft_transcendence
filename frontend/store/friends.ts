import { MutationTree, ActionTree, GetterTree } from 'vuex'

export const state = () => ({
  friends: []
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  friends: (state: any) => state.friends
}

export const mutations: MutationTree<RootState> = {
  SET_FRIENDS (state: any, data: any) {
    state.friends = data
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchFriends ({ commit }: any, id: number): Promise<any> {
    try {
      commit('preloader/SET_IS_LOADING', true, { root: true })
      const response = await this.$axios.get(`users/${id}/friends`)
      commit('SET_FRIENDS', response.data)
    } catch (e) {
      commit('SET_FRIENDS', [])
    } finally {
      commit('preloader/SET_IS_LOADING', false, { root: true })
    }
  },
  async sendFriendRequest ({ commit }: any, payload: any): Promise<any> {
    try {
      commit('preloader/SET_IS_LOADING', true, { root: true })
      await this.$axios.post(`users/${payload.id}/friends`, { id: payload.friendId })
    } finally {
      commit('preloader/SET_IS_LOADING', false, { root: true })
    }
  },
  async removeFriendRequest ({ commit }: any, payload: any): Promise<any> {
    try {
      commit('preloader/SET_IS_LOADING', true, { root: true })
      await this.$axios.delete(`/users/${payload.id}/friends/${payload.friendId}`)
    } finally {
      commit('preloader/SET_IS_LOADING', false, { root: true })
    }
  }
}
