import { MutationTree, ActionTree, GetterTree } from 'vuex'

export const state = () => ({
  users: []
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  users: (state: any) => state.users
}

export const mutations: MutationTree<RootState> = {
  SET_USERS (state: any, data: any) {
    state.users = data
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchLeaderboards ({ commit }: any): Promise<any> {
    try {
      commit('preloader/SET_IS_LOADING', true, { root: true })
      const response = await this.$axios.get('leaderboards')
      commit('SET_USERS', response.data)
    } catch (e) {
      commit('SET_USERS', [])
    } finally {
      commit('preloader/SET_IS_LOADING', false, { root: true })
    }
  }
}
