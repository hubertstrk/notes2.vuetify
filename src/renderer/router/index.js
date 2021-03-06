import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'editor',
      component: require('@/components/Editor').default
    },
    {
      path: '/new-project',
      name: 'NewProject',
      component: require('@/components/NewProject').default
    },
    {
      path: '/new-note',
      name: 'NewNote',
      component: require('@/components/NewNote').default
    },
    {
      path: '/import-projects',
      name: 'ImportProjects',
      component: require('@/components/ImportProjects').default
    },
    {
      path: '/manage-projects',
      name: 'ManageProjects',
      component: require('@/components/ManageProjects').default
    },
    {
      path: '/appearance',
      name: 'Appearance',
      component: require('@/components/Appearance').default
    },
    {
      path: '/about',
      name: 'About',
      component: require('@/components/About').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
