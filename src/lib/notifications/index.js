import notifications from './Notifications.vue'
import module from './module'

function install (Vue, options = {}) {
  if (!options.store) console.log('Please provide a store!')

  Vue.component('Notifications', notifications)

  options.store.registerModule('notifications', module)
}

export default {
  install
}
