import Location from '@model/Location'
import Note from '@model/Note'

const state = {
  active: null,
  notes: [],
  locations: []
}

const mutations = {
  setActiveNote (state, id) {
    const index = state.notes.findIndex(x => x.id === id)
    state.active = state.notes[index]
  },
  updateActiveNoteText (state, text) {
    state.active.setText(text)
  },
  deleteNote (state, id) {
    const index = state.notes.findIndex(x => x.id === id)
    state.notes.splice(index, 1)
  },
  loadNotes (state) {
    const location1 = new Location('C:\\Users\\Hubert\\Google Drive', 'Project')
    const location2 = new Location('C:\\Users\\Hubert\\Google Drive', 'Server')
    const location3 = new Location('C:\\Users\\Hubert\\Google Drive', 'Todo')

    const note1 = new Note(1, location1)
    note1.setText('# Definition')

    const note2 = new Note(2, location2)
    note2.setText('# Workflow')

    const note3 = new Note(3, location3)
    note3.setText('# Assignment')

    const note4 = new Note(4, location3)
    note4.setText('# Communication')

    const note5 = new Note(5, location3)
    note5.setText('# Transparent')

    const note6 = new Note(6, location3)
    note6.setText('# Phone Numbers')

    const note7 = new Note(7, location2)
    note7.setText('# Address')

    const note8 = new Note(8, location2)
    note8.setText('# Placeholder')

    const note9 = new Note(9, location2)
    note9.setText('# Actions and Commits')

    state.locations = [location1, location2, location3]
    state.notes = [note1, note2, note3, note4, note5, note6, note7, note8, note9]

    state.active = note3
  }
}

const actions = {
  setActiveNote ({state, commit}, id) {
    commit('setActiveNote')
  },
  updateActiveNoteText ({state, commit}, text) {
    commit('updateActiveNoteText', text)
  },
  deleteNote ({state, commit}, id) {
    commit('deleteNote', id)
  }
}

const getters = {
  notesByLocation: state => {
    return state.locations.map((location) => {
      return {
        location,
        notes: state.notes.filter(note => note.location.equals(location))
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
