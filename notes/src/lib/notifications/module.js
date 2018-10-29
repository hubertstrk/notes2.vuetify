const state = {
  all: []
}

const mutations = {
  add (state, notification) {
    state.all.push(notification)
  },
  remove (state, id) {
    const index = state.all.findIndex(x => x.id === id)
    if (index !== -1) {
      state.all.splice(index, 1)
    }
  }
}

const timeout = 30000000

const actions = {
  error ({dispatch}, notification) {
    dispatch('addNotification', {...notification, severity: 'error', icon: 'error'})
  },
  warning ({dispatch}, notification) {
    dispatch('addNotification', {...notification, severity: 'warning', icon: 'warning'})
  },
  info ({dispatch}, notification) {
    dispatch('addNotification', {...notification, severity: 'info', icon: 'info'})
  },
  success ({dispatch}, notification) {
    dispatch('addNotification', {...notification, severity: 'success', icon: 'done'})
  },
  addNotification ({commit}, notification) {
    if (state.all.find(x => x.text === notification.text)) return
    const id = state.all.length + 1
    commit('add', {...notification, id})
    setTimeout(() => {
      commit('remove', id)
    }, timeout)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
