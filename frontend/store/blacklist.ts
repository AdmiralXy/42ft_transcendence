import { MutationTree, ActionTree, GetterTree } from 'vuex'

export const state = () => ({
  blacklist: []
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  blacklist: (state: any) => state.blacklist
}

export const mutations: MutationTree<RootState> = {
  SET_BLACKLIST (state: any, data: any) {
    state.blacklist = data
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchBlacklist ({ commit }: any, id: number): Promise<any> {
    try {
      commit('preloader/SET_IS_LOADING', true, { root: true })
      const response = await this.$axios.get(`users/${id}/blacklist`)
      commit('SET_BLACKLIST', response.data)
    } catch (e) {
      commit('SET_BLACKLIST', [])
    } finally {
      commit('preloader/SET_IS_LOADING', false, { root: true })
    }
  },
  async addToBlacklist ({ commit }: any, payload: any): Promise<any> {
    try {
      commit('preloader/SET_IS_LOADING', true, { root: true })
      await this.$axios.post(`users/${payload.id}/blacklist`, { id: payload.blockId })
    } finally {
      commit('preloader/SET_IS_LOADING', false, { root: true })
    }
  },
  async removeFromBlacklist ({ commit }: any, payload: any): Promise<any> {
    try {
      commit('preloader/SET_IS_LOADING', true, { root: true })
      await this.$axios.delete(`/users/${payload.id}/blacklist/${payload.blockId}`)
    } finally {
      commit('preloader/SET_IS_LOADING', false, { root: true })
    }
  }
}
