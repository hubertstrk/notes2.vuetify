import Location from '@model/Location'
// import Note from '@model/Note'
import {addLocation, readDirectory, readFile, writeNote, addNote} from '../../../api/file'

import settingsManager from '../../../api/settings-manager'
import Note from '../../../model/Note'

const state = {
  settings: {
    paths: []
  },
  active: null,
  notes: [],
  locations: []
}

const mutations = {
  addLocation (state, Location) {
    state.locations.push(Location)
  },
  activateNote (state, id) {
    const index = state.notes.findIndex(x => x.id === id)
    state.active = state.notes[index]
  },
  updateNoteText (state, text) {
    state.active.setText(text)
  },
  setUserSettings (state, settings) {
    Object.assign(state.settings, settings)
  },
  addNote (state, note) {
    state.notes.push(note)
  }
}

const actions = {
  createNote ({commit}, location) {
    return addNote(location.fullPath, '# Title').then((id) => {
      const note = new Note(id, location)
      note.setText('# Title')
      commit('addNote', note)
      commit('activateNote', note.id)
    })
  },
  activateNote ({state, commit}, id) {
    return writeNote(state.active)
      .then(() => {
        commit('activateNote', id)
      })
  },
  addLocation ({commit}, {location, folder}) {
    const add = new Location(location, folder)
    return addLocation(add).then(() => {
      commit('addLocation', add)
    })
  },
  updateNoteText ({state, commit}, text) {
    commit('updateNoteText', text)
  },
  ensureUserSettings ({dispatch}) {
    return settingsManager.ensureUserSettingsFile()
      .then(dispatch('readUserSettings'))
  },
  readUserSettings ({commit}) {
    return settingsManager.readUserSettings()
      .then(settings => commit('setUserSettings', settings))
  },
  writeUserSettings ({state}) {
    return settingsManager.writeUserSettings(state.settings)
  },
  readLocations ({state, commit}) {
    const locations = state.settings.paths.map(path => readDirectory(path))
    return Promise.all(locations)
      .then((locations) => {
        locations.forEach((location) => {
          location.forEach(({path, name}) => {
            const location = new Location(path, name)
            commit('addLocation', location)
          })
        })
      })
  },
  readNotes ({state, commit}) {
    state.locations.forEach((location) => {
      readDirectory(location.fullPath).then((filePaths) => {
        filePaths.forEach((filePath) => {
          readFile(filePath.path, filePath.name).then((text) => {
            const newNote = new Note(filePath.name, location)
            newNote.setText(text)
            commit('addNote', newNote)
          })
        })
      })
    })
  }
}

const getters = {
  notesInLocation: state => {
    return state.locations.map((location) => {
      return {
        location,
        notes: state.notes.filter(note => note.location.equals(location))
      }
    })
  },
  notesByLocation: state => {
    return state.notes.reduce((acc, curr) => {
      if (acc[curr.location.fullPath]) {
        acc[curr.location.fullPath].push(curr)
      } else {
        acc[curr.location.fullPath] = []
        acc[curr.location.fullPath].push(curr)
      }
      return acc
    }, {})
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
