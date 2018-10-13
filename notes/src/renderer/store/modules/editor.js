import Location from '@model/Location'
// import Note from '@model/Note'
import {addLocation, readDirectory, readFile, writeNote, addNote, deleteNote} from '../../../api/file'

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
  addPathToSettings (state, path) {
    state.settings.paths.push(path)
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
  },
  deletNote (state, id) {
    const index = state.notes.findIndex(x => x.id === id)
    state.notes.splice(index, 1)
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
  deleteNote ({state, commit}) {
    const note = state.active
    deleteNote(note.location.fullPath, note.id).then(() => {
      commit('deletNote', note.id)
    })
  },
  activateNote ({state, commit}, id) {
    return writeNote(state.active)
      .then(() => {
        commit('activateNote', id)
      })
  },
  addLocation ({commit}, {path, name}) {
    const location = new Location(path, name)
    return addLocation(location).then(() => {
      commit('addLocation', location)
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
    return settingsManager.writeUserSettings(state.settings).then(() => {
      console.info('writeUserSettings done')
    })
  },
  readLocations ({state, dispatch}) {
    return dispatch('readLocationsByPaths', state.settings.paths)
  },
  readLocationsByPaths ({commit}, paths) {
    const locations = paths.map(path => readDirectory(path))
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
  readNotes ({state, dispatch}) {
    state.locations.map((location) => {
      return dispatch('readNotesByLocation', location)
    })
  },
  readNotesByLocation ({state, commit}, location) {
    return readDirectory(location.fullPath).then((filePaths) => {
      filePaths.map((filePath) => {
        return readFile(filePath.path, filePath.name).then((text) => {
          const newNote = new Note(filePath.name, location)
          newNote.setText(text)
          commit('addNote', newNote)
          if (!state.active) {
            commit('activateNote', newNote.id)
          }
        })
      })
    })
  },
  importProjects ({commit, dispatch}, path) {
    commit('addPathToSettings', path)
    return dispatch('writeUserSettings')
      .then(() => {
        return dispatch('readLocations')
      })
      .then(() => {
        return dispatch('readNotes')
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
