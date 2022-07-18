import { MutationTree, ActionTree, GetterTree } from 'vuex'

export const state = () => ({
  matches: [],
  match: {},
  rating: 0 as number
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  matches: (state: any) => state.matches,
  finishedMatches: (state: any) => {
    return state.matches.filter((match: any) => match.winner !== null).sort((a: any, b: any) => {
      const dateA = new Date(a.updated_at)
      const dateB = new Date(b.updated_at)
      return dateB.getTime() - dateA.getTime()
    }).slice(0, 100)
  },
  match: (state: any) => state.match,
  rating: (state: any) => state.rating,
}

export const mutations: MutationTree<RootState> = {
  SET_MATCHES (state: any, data: any) {
    state.matches = data
  },
  SET_MATCH (state: any, data: any) {
    state.match = data
  },
  SET_RATING (state: any, data: any) {
    state.rating = data
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchMatches ({ commit }: any, userId: number): Promise<any> {
    try {
      commit('preloader/SET_IS_LOADING', true, { root: true })
      const response = await this.$axios.get(`users/${userId}/matches`)
      commit('SET_MATCHES', response.data)
    } catch (e) {
      commit('SET_MATCHES', [])
    } finally {
      commit('preloader/SET_IS_LOADING', false, { root: true })
    }
  },
  async fetchMatch ({ commit }: any, matchId: number): Promise<any> {
    try {
      commit('preloader/SET_IS_LOADING', true, { root: true })
      const response = await this.$axios.get(`matches/${matchId}`)
      commit('SET_MATCH', response.data)
    } catch (e) {
      commit('SET_MATCH', {})
    } finally {
      commit('preloader/SET_IS_LOADING', false, { root: true })
    }
  },
  async fetchRating ({ commit }: any, userId: number): Promise<any> {
    try {
      commit('preloader/SET_IS_LOADING', true, { root: true })
      const response = await this.$axios.get(`users/${userId}/rating`)
      commit('SET_RATING', response.data)
    } catch (e) {
      commit('SET_RATING', 0)
    } finally {
      commit('preloader/SET_IS_LOADING', false, { root: true })
    }
  }
}
