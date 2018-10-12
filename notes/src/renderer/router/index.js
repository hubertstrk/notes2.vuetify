import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome-view',
      component: require('@/components/WelcomeView').default
    },
    {
      path: '/synchronization',
      name: 'Synchronization',
      component: require('@/components/Synchronization').default
    },
    {
      path: '/newNote',
      name: 'NewNote',
      component: require('@/components/NewNote').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
