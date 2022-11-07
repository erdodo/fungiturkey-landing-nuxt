export const state = () => ({
  token: '',
  profile: '',
  fungi: 'fungitu2_fungiturkey',
  simple: 'fungitu2_Simple',
  img_base: 'https://api.fungiturkey.org/uploads/',
})

export const getters = {
  getToken(state) {
    return state.token
  },
  getProfile(state) {
    return state.profile
  },
}

export const mutations = {
  setToken(state, data) {
    state.token = data
  },
  setProfile(state, data) {
    state.profile = data
  },
}

export const actions = {}
