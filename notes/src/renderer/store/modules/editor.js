import Project from '@model/Location'
import Note from '@model/Note'
import fileApi from '@api/file'

import settingsManager from '@api/settings-manager'

const state = {
  settings: {
    paths: [],
    editorTheme: ''
  },
  active: null,
  notes: [],
  projects: []
}

const mutations = {
  addProject (state, Project) {
    state.projects.push(Project)
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
  },
  setEditorTheme (state, theme) {
    state.settings.editorTheme = theme
  }
}

const actions = {
  createNote ({commit}, Project) {
    return fileApi.addNote(Project.fullPath, '# Title').then((id) => {
      const note = new Note(id, Project)
      note.setText('# Title')
      commit('addNote', note)
      commit('activateNote', note.id)
    })
  },
  deleteNote ({state, commit}) {
    const note = state.active
    fileApi.deleteNote(note.project.fullPath, note.id).then(() => {
      commit('deletNote', note.id)
    })
      .then(() => {
        commit('activateNote', state.notes[0].id)
      })
  },
  activateNote ({state, commit}, id) {
    return fileApi.writeNote(state.active)
      .then(() => {
        commit('activateNote', id)
      })
  },
  writeCurrentNote ({state}) {
    return fileApi.writeNote(state.active)
  },
  addProject ({commit}, {path, name}) {
    const project = new Project(path, name)
    return fileApi.addLocation(project).then(() => {
      commit('addProject', project)
    })
  },
  updateNoteText ({commit}, text) {
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
  readProjects ({state, dispatch}) {
    return dispatch('readProjectsByPaths', state.settings.paths)
  },
  readProjectsByPaths ({commit}, paths) {
    const projects = paths.map(path => fileApi.readDirectory(path))
    return Promise.all(projects)
      .then((projects) => {
        projects.forEach((project) => {
          project.forEach(({path, name}) => {
            const project = new Project(path, name)
            commit('addProject', project)
          })
        })
      })
  },
  readNotes ({state, dispatch}) {
    state.projects.map((project) => {
      return dispatch('readNotesByProject', project)
    })
  },
  readNotesByProject ({state, commit}, project) {
    return fileApi.readDirectory(project.fullPath).then((filePaths) => {
      filePaths.map((filePath) => {
        return fileApi.readFile(filePath.path, filePath.name).then((text) => {
          const note = new Note(filePath.name, project)
          note.setText(text)
          commit('addNote', note)
          if (!state.active) {
            commit('activateNote', note.id)
          }
        })
      })
    })
  },
  importProjects ({commit, dispatch}, path) {
    commit('addPathToSettings', path)
    return dispatch('writeUserSettings')
      .then(() => {
        return dispatch('readProjects')
      })
      .then(() => {
        return dispatch('readNotes')
      })
  },
  setEditorTheme ({commit, dispatch}, theme) {
    commit('setEditorTheme', theme)
    dispatch('writeUserSettings')
  }
}

const getters = {
  projectNotes: state => {
    return state.projects.map((project) => {
      return {
        project,
        notes: state.notes.filter(note => note.project.equals(project))
      }
    })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
