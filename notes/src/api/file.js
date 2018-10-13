const fs = require('fs')
const uuidv4 = require('uuid/v4')

export const addLocation = (Location) => {
  return new Promise((resolve, reject) => {
    return fs.mkdir(Location.fullPath, (error) => {
      if (error) reject(error)
      resolve('folder created')
    })
  })
}

export const readDirectory = (path) => {
  return new Promise((resolve, reject) => {
    const names = fs.readdirSync(path)
    const dirNames = names.map((name) => {
      return { path, name }
    })
    resolve(dirNames)
  })
}

export const readFile = (path, filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`${path}/${filename}`, 'utf8', (error, text) => {
      if (error) reject(error)
      resolve(text)
    })
  })
}

export const writeNote = (note) => {
  return new Promise((resolve, reject) => {
    if (!note) resolve()
    fs.writeFile(`${note.location.fullPath}/${note.id}`, note.text, 'utf8', (error) => {
      if (error) reject(error)
      resolve()
    })
  })
}

export const addNote = (path, markdown) => {
  return new Promise((resolve, reject) => {
    const uuid = uuidv4() // uuid is filename
    fs.appendFile(`${path}/${uuid}`, markdown, 'utf8', (error) => {
      if (error) reject(error)
      resolve(uuid)
    })
  })
}

export const deleteNote = (path, filename) => {
  return new Promise((resolve, reject) => {
    try {
      fs.unlinkSync(`${path}/${filename}`)
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}
