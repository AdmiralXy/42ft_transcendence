import { MutationTree, ActionTree, GetterTree } from 'vuex'

export const state = () => ({
  group: {},
  groups: []
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  group: (state: any) => state.group,
  groups: (state: any) => state.groups
}

export const mutations: MutationTree<RootState> = {
  SET_GROUP (state: any, data: any) {
    state.group = data
  },
  SET_GROUPS (state: any, data: any) {
    state.groups = data
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchGroups ({ commit }: any): Promise<any> {
    try {
      commit('preloader/SET_IS_LOADING', true, { root: true })
      const response = await this.$axios.get('groups')
      commit('SET_GROUPS', response.data)
    } catch (e) {
      commit('SET_GROUPS', [])
    } finally {
      commit('preloader/SET_IS_LOADING', false, { root: true })
    }
  },
  async fetchGroup ({ commit }, { id, data }: any): Promise<any> {
    try {
      commit('preloader/SET_IS_LOADING', true, { root: true })
      const response = await this.$axios.get(`groups/${id}`, { data })
      commit('SET_GROUP', response.data)
    } finally {
      commit('preloader/SET_IS_LOADING', false, { root: true })
    }
  },
  async createGroup ({ commit }, payload: any): Promise<any> {
    try {
      commit('preloader/SET_IS_LOADING', true, { root: true })
      const response = await this.$axios.post('groups', { ...payload })
      commit('SET_GROUP', response.data)
    } finally {
      commit('preloader/SET_IS_LOADING', false, { root: true })
    }
  },
  async updateGroup ({ commit }, { id, data }: any): Promise<any> {
    try {
      commit('preloader/SET_IS_LOADING', true, { root: true })
      const response = await this.$axios.patch(`groups/${id}`, data)
      commit('SET_GROUP', response.data)
    } finally {
      commit('preloader/SET_IS_LOADING', false, { root: true })
    }
  },
  async deleteGroup ({ commit }, id: number): Promise<any> {
    try {
      commit('preloader/SET_IS_LOADING', true, { root: true })
      const response = await this.$axios.delete(`groups/${id}`)
      commit('SET_GROUP', response.data)
    } finally {
      commit('preloader/SET_IS_LOADING', false, { root: true })
    }
  }
}
