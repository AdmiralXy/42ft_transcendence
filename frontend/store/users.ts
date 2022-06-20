import { MutationTree, ActionTree, GetterTree } from 'vuex'

export const state = () => ({
  user: {},
  users: []
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  users: (state: any) => state.users,
  user: (state: any) => state.user
}

export const mutations: MutationTree<RootState> = {
  SET_USERS (state: any, data: any) {
    state.users = data
  },
  SET_USER (state: any, data: any) {
    state.user = data
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchUsers ({ commit }: any): Promise<any> {
    try {
      commit('preloader/SET_IS_LOADING', true, { root: true })
      const response = await this.$axios.get('users')
      commit('SET_USERS', response.data)
    } catch (e) {
      commit('SET_USERS', [])
    } finally {
      commit('preloader/SET_IS_LOADING', false, { root: true })
    }
  },
  async fetchUser ({ commit }, id: number): Promise<any> {
    try {
      commit('preloader/SET_IS_LOADING', true, { root: true })
      const response = await this.$axios.get('users/' + id)
      commit('SET_USER', response.data)
    } finally {
      commit('preloader/SET_IS_LOADING', false, { root: true })
    }
  },
  async updateUser ({ commit }, { id, data }: any): Promise<any> {
    try {
      commit('preloader/SET_IS_LOADING', true, { root: true })
      const response = await this.$axios.patch('users/' + id, data)
      commit('SET_USER', response.data)
    } finally {
      commit('preloader/SET_IS_LOADING', false, { root: true })
    }
  }
}
