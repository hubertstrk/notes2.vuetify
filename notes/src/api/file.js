const fs = require('fs')
const path = require('path')
const uuidv4 = require('uuid/v4')

const addLocation = (Project) => {
  return new Promise((resolve, reject) => {
    return fs.mkdir(Project.fullPath, (error) => {
      if (error) reject(error)
      resolve('folder created')
    })
  })
}

const readDirectory = (path) => {
  return new Promise((resolve, reject) => {
    const names = fs.readdirSync(path)
    const dirNames = names.map((name) => {
      return { path, name }
    })
    resolve(dirNames)
  })
}

const readFile = (filepath, filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(filepath, filename), 'utf8', (error, text) => {
      if (error) reject(error)
      resolve(text)
    })
  })
}

const writeNote = (note) => {
  return new Promise((resolve, reject) => {
    if (!note) resolve()
    fs.writeFile(path.join(note.project.fullPath, note.id), note.text, 'utf8', (error) => {
      if (error) reject(error)
      resolve()
    })
  })
}

const addNote = (filepath, markdown) => {
  return new Promise((resolve, reject) => {
    const uuid = uuidv4() // uuid is filename
    fs.appendFile(path.join(filepath, uuid), markdown, 'utf8', (error) => {
      if (error) reject(error)
      resolve(uuid)
    })
  })
}

const deleteNote = (filepath, filename) => {
  return new Promise((resolve, reject) => {
    try {
      fs.unlinkSync(path.join(filepath, filename))
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

export default {
  addLocation,
  readDirectory,
  readFile,
  writeNote,
  addNote,
  deleteNote
}
