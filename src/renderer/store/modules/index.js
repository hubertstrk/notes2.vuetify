const files = require.context('.', false, /\.js$/)
const modules = {}

files.keys().forEach(key => {
  if (key === './index.js') return
  const moduleName = key.replace(/(\.\/|\.js)/g, '')
  modules[moduleName] = {
    namespaced: true,
    ...files(key).default
  }
})

export default modules
