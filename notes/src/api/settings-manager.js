const electron = require('electron')
const path = require('path')
const fs = require('fs')

const userSettingsFileName = 'notes-user-settings'
const fullFileName = () => {
  const userDataPath = (electron.app || electron.remote.app).getPath('userData')
  return path.join(userDataPath, userSettingsFileName + '.json')
}

const ensureUserSettingsFile = () => {
  const path = fullFileName()
  console.info(`location settings file: ${path}`)
  return new Promise((resolve, reject) => {
    fs.access(path, fs.constants.F_OK || fs.constants.W_OK, (error) => { // F_OK => writable; F_OK => exists
      if (error && error.code === 'ENOENT') {
        try {
          fs.appendFileSync(path, JSON.stringify(''))
          resolve(`settings file created at ${path}`)
        } catch (error) {
          reject(error)
        }
      }
      resolve(`settings file already exists at ${path}`)
    })
  })
}

const readUserSettings = () => {
  const path = fullFileName()
  return new Promise((resolve, reject) => {
    try {
      const settings = JSON.parse(fs.readFileSync(path))
      resolve(settings)
    } catch (error) {
      reject(error)
    }
  })
}

const writeUserSettings = (userSettings) => {
  const path = fullFileName()
  return new Promise((resolve, reject) => {
    try {
      fs.writeFileSync(path, JSON.stringify(userSettings))
      resolve(userSettings)
    } catch (error) {
      reject(error)
    }
  })
}

export default {
  ensureUserSettingsFile,
  readUserSettings,
  writeUserSettings
}
