import Project from '@model/Location'
import Note from '@model/Note'
import fileApi from '@api/file'
import settingsManager from '@api/settings-manager'
import {setCodeTheme} from '@js/marked-config'

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
    active: null,
    readMode: false,
    displayGutter: true,
    favouriteProjects: []
  },
  notes: [],
  projects: []
}

const mutations = {
  toggleReadMode (state) {
    state.settings.readMode = !state.settings.readMode
  },
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
    if (index !== -1) {
      state.notes[index].setText(text)
    }
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
  },
  toggleGutter (state) {
    state.settings.displayGutter = !state.settings.displayGutter
  },
  addFavouriteProject (state, project) {
    const favourites = state.settings.favouriteProjects.map(x => new Project(x.path, x.name))
    if (!favourites.some(x => x.equals(project))) {
      state.settings.favouriteProjects.push(project)
    }
    if (state.settings.favouriteProjects.length >= 4) {
      state.settings.favouriteProjects.shift()
    }
  },
  deleteProject (state, project) {
    const index = state.projects.findIndex(x => x.equals(project))
    state.projects.splice(index, 1)

    const favoriteIndex = state.settings.favouriteProjects.findIndex(x => x.path === project.path && x.name === project.name)
    state.settings.favouriteProjects.splice(favoriteIndex, 1)
  }
}

const actions = {
  createNote ({commit, dispatch}, Project) {
    dispatch('notifications/success', {text: 'Note created'}, {root: true})
    return fileApi.addNote(Project.fullPath, '# Title').then((id) => {
      const note = new Note(id, Project)
      note.setText('# Title')
      commit('addNote', note)
      commit('activateNote', note.id)
    })
      .catch(({message}) => {
        console.error(message)
      })
  },
  deleteNote ({dispatch, commit, getters}) {
    const activeNote = getters.activeNote
    if (activeNote) {
      fileApi.deleteNote(activeNote.project.fullPath, activeNote.id)
        .then(() => {
          dispatch('notifications/success', {text: 'Note deleted'}, {root: true})
        })
        .catch(({message}) => {
          console.error(message)
        })
    }
    commit('deletNote', activeNote.id)
  },
  activateNote ({commit, getters, dispatch}, id) {
    if (getters.activeNote) {
      fileApi.writeNote(getters.activeNote)
        .catch(({message}) => {
          console.error(message)
        })
    }
    commit('activateNote', id)
    dispatch('writeUserSettings')
      .catch(({message}) => {
        console.error(message)
      })
  },
  writeCurrentNote ({getters}) {
    return fileApi.writeNote(getters.activeNote)
      .catch(({message}) => {
        console.error(message)
      })
  },
  addProject ({commit, dispatch}, {path, name}) {
    const project = new Project(path, name)
    commit('addProject', project)
    return fileApi.addLocation(project).then(() => {
      dispatch('notifications/success', {text: 'Project created'}, {root: true})
    })
  },
  updateNoteText ({commit}, text) {
    commit('updateNoteText', text)
  },
  ensureUserSettings ({dispatch}) {
    return settingsManager.ensureUserSettingsFile()
      .then(dispatch('readUserSettings'))
      .catch(({message}) => {
        console.error(message)
      })
  },
  readUserSettings ({commit}) {
    return settingsManager.readUserSettings()
      .then((settings) => {
        commit('setUserSettings', settings)
        setCodeTheme(settings.codeTheme)
      })
      .catch(({message}) => {
        console.error(message)
      })
  },
  writeUserSettings ({state}) {
    return settingsManager.writeUserSettings(state.settings)
      .catch(({message}) => {
        console.error(message)
      })
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
  readNotesByProject ({dispatch, commit}, project) {
    return fileApi.readDirectory(project.fullPath).then((filePaths) => {
      return filePaths.map((filePath) => {
        return fileApi.readFile(filePath.path, filePath.name).then((text) => {
          const note = new Note(filePath.name, project)
          note.setText(text)
          commit('addNote', note)
        })
          .catch(({message}) => {
            dispatch('notifications/error', {text: message}, {root: true})
            console.error(message)
          })
      })
    })
      .catch(({message}) => {
        dispatch('notifications/notify', {message, severity: 'error'}, {root: true})
        console.error(message)
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
      .then(() => {
        dispatch('notifications/success', {text: 'Project imported'}, {root: true})
      })
  },
  setEditorTheme ({commit, dispatch}, theme) {
    commit('setEditorTheme', theme)
    dispatch('writeUserSettings')
    dispatch('notifications/success', {text: 'Saved'}, {root: true})
  },
  setCodeTheme ({commit, dispatch}, theme) {
    commit('setCodeTheme', theme)
    setCodeTheme(theme)
    dispatch('writeUserSettings')
    dispatch('notifications/success', {text: 'Saved'}, {root: true})
  },
  setEditorFontSize ({commit, dispatch}, fontSize) {
    commit('setEditorFontSize', fontSize)
    dispatch('writeUserSettings')
  },
  setDisplayFoldWidgets ({commit, dispatch}, value) {
    commit('setDisplayFoldWidgets', value)
    dispatch('writeUserSettings')
    dispatch('notifications/success', {text: 'Saved'}, {root: true})
  },
  setHighlightActiveLine ({commit, dispatch}, value) {
    commit('setHighlightActiveLine', value)
    dispatch('writeUserSettings')
    dispatch('notifications/success', {text: 'Saved'}, {root: true})
  },
  setAppTheme ({commit, dispatch}, color) {
    commit('setAppTheme', color)
    dispatch('writeUserSettings')
  },
  toggleStarred ({commit, dispatch}, id) {
    commit('toggleStarred', id)
    dispatch('writeUserSettings')
  },
  toggleGutter ({commit, dispatch}) {
    commit('toggleGutter')
    dispatch('writeUserSettings')
  },
  addFavouriteProject ({commit, dispatch}, project) {
    commit('addFavouriteProject', project)
    dispatch('writeUserSettings')
  },
  deleteProject ({commit}, project) {
    commit('deleteProject', project)
    fileApi.deleteProject(project.path, project.name)
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
