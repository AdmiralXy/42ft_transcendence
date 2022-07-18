import { MutationTree, ActionTree, GetterTree } from 'vuex'

export const state = () => ({
  isLoading: false as boolean
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  isLoading: (state: any) => state.isLoading
}

export const mutations: MutationTree<RootState> = {
  SET_IS_LOADING (state: any, data: any) {
    state.isLoading = data
  }
}

export const actions: ActionTree<RootState, RootState> = {
  setIsLoading ({ commit }: any, data: boolean): void {
    commit('SET_IS_LOADING', data)
  }
}
