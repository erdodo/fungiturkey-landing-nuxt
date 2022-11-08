export const state = () => ({
  token: '',
  profile: '',
  fungi: process.env.fungi,
  simple: process.env.simple,
  img_base: process.env.img_base,
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
