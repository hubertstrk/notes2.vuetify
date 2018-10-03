class Location {
  constructor (path, name) {
    this.path = path
    this.name = name
  }
  equals (toCompare) {
    return toCompare.path === this.path && toCompare.name === this.name
  }
}

export default Location
