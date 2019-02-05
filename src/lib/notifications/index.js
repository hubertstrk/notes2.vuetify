import notifications from './Notifications.vue'
import module from './module'

function install (Vue, options = {}) {
  if (!options.store) console.log('Please provide a store!')

  Vue.component('Notifications', notifications)

  // add options to state
  module.state.timeout = options.options.timeout
  options.store.registerModule('notifications', module)
}

export default {
  install
}
