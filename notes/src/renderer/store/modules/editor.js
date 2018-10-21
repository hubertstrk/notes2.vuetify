import Project from '@model/Location'
import Note from '@model/Note'
import fileApi from '@api/file'
import settingsManager from '@api/settings-manager'

const state = {
  settings: {
    paths: [],
    codeTheme: 'default',
    editorTheme: 'chrome',
    editorFontSize: 12,
    displayFoldWidgets: true,
    highlightActiveLine: true,
    appTheme: '#424242',
    starred: [],
    active: null // id
  },
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
    state.settings.active = id
  },
  updateNoteText (state, text) {
    const index = state.notes.findIndex(x => x.id === state.settings.active)
    state.notes[index].setText(text)
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
    if (state.settings.active === id) {
      state.settings.active = null
    }
  },
  setEditorTheme (state, theme) {
    state.settings.editorTheme = theme
  },
  setCodeTheme (state, theme) {
    state.settings.codeTheme = theme
  },
  setEditorFontSize (state, fontSize) {
    state.settings.editorFontSize = fontSize
  },
  setDisplayFoldWidgets (state, value) {
    state.settings.displayFoldWidgets = value
  },
  setHighlightActiveLine (state, value) {
    state.settings.highlightActiveLine = value
  },
  setAppTheme (state, theme) {
    state.settings.appTheme = theme
  },
  toggleStarred (state, id) {
    const index = state.settings.starred.indexOf(id)
    if (index === -1) {
      state.settings.starred.push(id)
    } else {
      state.settings.starred.splice(index, 1)
    }
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
  deleteNote ({state, commit, getters}) {
    const activeNote = getters.activeNote
    if (activeNote) {
      fileApi.deleteNote(activeNote.project.fullPath, activeNote.id)
    }
    commit('deletNote', activeNote.id)
  },
  activateNote ({state, commit, getters}, id) {
    if (getters.activeNote) {
      fileApi.writeNote(getters.activeNote)
    }
    commit('activateNote', id)
  },
  writeCurrentNote ({getters}) {
    return fileApi.writeNote(getters.activeNote)
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
  readNotesByProject ({commit}, project) {
    return fileApi.readDirectory(project.fullPath).then((filePaths) => {
      filePaths.map((filePath) => {
        return fileApi.readFile(filePath.path, filePath.name).then((text) => {
          const note = new Note(filePath.name, project)
          note.setText(text)
          commit('addNote', note)
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
  },
  setCodeTheme ({commit, dispatch}, theme) {
    commit('setCodeTheme', theme)
    dispatch('writeUserSettings')
  },
  setEditorFontSize ({commit, dispatch}, fontSize) {
    commit('setEditorFontSize', fontSize)
    dispatch('writeUserSettings')
  },
  setDisplayFoldWidgets ({commit, dispatch}, value) {
    commit('setDisplayFoldWidgets', value)
    dispatch('writeUserSettings')
  },
  setHighlightActiveLine ({commit, dispatch}, value) {
    commit('setHighlightActiveLine', value)
    dispatch('writeUserSettings')
  },
  setAppTheme ({commit, dispatch}, color) {
    commit('setAppTheme', color)
    dispatch('writeUserSettings')
  },
  toggleStarred ({commit, dispatch}, id) {
    commit('toggleStarred', id)
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
  },
  activeNote: state => {
    if (state.settings.active) {
      const index = state.notes.findIndex(x => x.id === state.settings.active)
      return state.notes[index]
    }
    return null
  },
  starredNotes: state => {
    const starred = state.notes.reduce((starred, note) => {
      if (state.settings.starred.find(x => x === note.id)) {
        starred.push(note)
      }
      return starred
    }, [])
    return starred
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
