const state = {
  timeout: 3000,
  all: []
}

const mutations = {
  add (state, notification) {
    state.all.push(notification)
  },
  remove (state) {
    state.all.pop()
  }
}

const error = {
  severity: 'error',
  icon: 'error'
}
const info = {
  severity: 'info',
  icon: 'info'
}
const warning = {
  severity: 'warning',
  icon: 'warning'
}
const success = {
  severity: 'success',
  icon: 'done'
}

const actions = {
  error ({dispatch}, text) {
    dispatch('addNotification', Object.assign(error, {text}))
  },
  warning ({dispatch}, text) {
    dispatch('addNotification', Object.assign(warning, {text}))
  },
  info ({dispatch}, text) {
    dispatch('addNotification', Object.assign(info, {text}))
  },
  success ({dispatch}, text) {
    dispatch('addNotification', Object.assign(success, {text}))
  },
  addNotification ({state, commit}, notification) {
    if (state.all.find(x => x.text === notification.text)) return
    commit('add', {...notification})
    setTimeout(() => {
      commit('remove')
    }, state.timeout)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
