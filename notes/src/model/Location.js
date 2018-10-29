const path = require('path')

class Project {
  constructor (path, name) {
    this.path = path
    this.name = name
  }
  get fullPath () {
    return path.join(this.path, this.name)
  }

  equals (toCompare) {
    return toCompare.path === this.path && toCompare.name === this.name
  }
}

export default Project
