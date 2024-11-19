import { createStore } from 'vuex'
import axios from 'axios'

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/' // Replace with your actual API URL
});
export default createStore({
  state: {
  user: (() => {
    const user = localStorage.getItem('user');
    try {
      return user ? JSON.parse(user) : null;
    } catch (e) {
      console.error("Error parsing 'user' from localStorage:", e);
      return null;
    }
  })(),
  token: localStorage.getItem('token') || null
}
,
  mutations: {
    SET_USER(state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    SET_TOKEN(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    CLEAR_AUTH(state) {
      state.user = null
      state.token = null
      localStorage.removeItem('token')
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        // Dans un environnement de production, décommentez le code ci-dessous
        const response = await api.post('login', credentials)
        const { user, token } = response.data.data
        console.log("Email => ", response.data.data )
        commit('SET_USER', user)
        commit('SET_TOKEN', token)
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        return true

        // Code de simulation pour le développement
        // if (credentials.email === 'test@test.com' && credentials.password === 'password') {
        //   const token = 'fake-jwt-token'
        //   const user = { email: credentials.email }
        //   commit('SET_USER', user)
        //   commit('SET_TOKEN', token)
        //   return true
        // }
      //  return false
      } catch (error) {
        console.error('Login error:', error)
        throw error
      }
    },
    logout({ commit }) {
      commit('CLEAR_AUTH')
      delete api.defaults.headers.common['Authorization']
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    currentUser: state => state.user,
    authToken: state => state.token
  }
})