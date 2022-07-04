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
  async fetchGroup ({ commit }, { id }: any): Promise<any> {
    try {
      commit('preloader/SET_IS_LOADING', true, { root: true })
      const response = await this.$axios.get(`groups/${id}`)
      commit('SET_GROUP', response.data)
    } finally {
      commit('preloader/SET_IS_LOADING', false, { root: true })
    }
  },
  async joinGroup ({ commit }, { id, data }: any): Promise<any> {
    try {
      commit('preloader/SET_IS_LOADING', true, { root: true })
      const response = await this.$axios.post(`groups/${id}`, data)
      commit('SET_GROUP', response.data)
    } finally {
      commit('preloader/SET_IS_LOADING', false, { root: true })
    }
  },
  async createGroup ({ commit }, payload: any): Promise<any> {
    try {
      commit('preloader/SET_IS_LOADING', true, { root: true })
      await this.$axios.post('groups', { ...payload })
    } finally {
      commit('preloader/SET_IS_LOADING', false, { root: true })
    }
  },
  async updateGroup ({ commit }, { id, data }: any): Promise<any> {
    try {
      commit('preloader/SET_IS_LOADING', true, { root: true })
      await this.$axios.patch(`groups/${id}`, data)
    } finally {
      commit('preloader/SET_IS_LOADING', false, { root: true })
    }
  },
  async deleteGroup ({ commit }, id: number): Promise<any> {
    try {
      commit('preloader/SET_IS_LOADING', true, { root: true })
      await this.$axios.delete(`groups/${id}`)
    } finally {
      commit('preloader/SET_IS_LOADING', false, { root: true })
    }
  },
  async addAdmin ({ commit }, { id, data }: any): Promise<any> {
    try {
      commit('preloader/SET_IS_LOADING', true, { root: true })
      await this.$axios.post(`groups/${id}/admin-list`, data)
    } finally {
      commit('preloader/SET_IS_LOADING', false, { root: true })
    }
  },
  async removeAdmin ({ commit }, { id, data }: any): Promise<any> {
    try {
      commit('preloader/SET_IS_LOADING', true, { root: true })
      await this.$axios.delete(`groups/${id}/admin-list`, { data })
    } finally {
      commit('preloader/SET_IS_LOADING', false, { root: true })
    }
  },
  async addToInviteList ({ commit }, { id, data }: any): Promise<any> {
    try {
      commit('preloader/SET_IS_LOADING', true, { root: true })
      await this.$axios.post(`groups/${id}/invite-list`, data)
    } finally {
      commit('preloader/SET_IS_LOADING', false, { root: true })
    }
  },
  async removeFromInviteList ({ commit }, { id, data }: any): Promise<any> {
    try {
      commit('preloader/SET_IS_LOADING', true, { root: true })
      await this.$axios.delete(`groups/${id}/invite-list`, { data })
    } finally {
      commit('preloader/SET_IS_LOADING', false, { root: true })
    }
  },
  async addToBanList ({ commit }, { id, data }: any): Promise<any> {
    try {
      commit('preloader/SET_IS_LOADING', true, { root: true })
      await this.$axios.post(`groups/${id}/ban-list`, data)
    } finally {
      commit('preloader/SET_IS_LOADING', false, { root: true })
    }
  },
  async removeFromBanList ({ commit }, { id, data }: any): Promise<any> {
    try {
      commit('preloader/SET_IS_LOADING', true, { root: true })
      await this.$axios.delete(`groups/${id}/ban-list`, { data })
    } finally {
      commit('preloader/SET_IS_LOADING', false, { root: true })
    }
  },
  async addToMuteList ({ commit }, { id, data }: any): Promise<any> {
    try {
      commit('preloader/SET_IS_LOADING', true, { root: true })
      await this.$axios.post(`groups/${id}/mute-list`, data)
    } finally {
      commit('preloader/SET_IS_LOADING', false, { root: true })
    }
  },
  async removeFromMuteList ({ commit }, { id, data }: any): Promise<any> {
    try {
      commit('preloader/SET_IS_LOADING', true, { root: true })
      await this.$axios.delete(`groups/${id}/mute-list`, { data })
    } finally {
      commit('preloader/SET_IS_LOADING', false, { root: true })
    }
  }
}
