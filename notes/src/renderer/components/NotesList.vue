<template>
  <div>
     <template v-for="projectNote in projectNotes">
        <v-list-group v-model="projectNote.active" :key="projectNote.project.fullPath">
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile-title>{{projectNote.project.name}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="activateNote(note.id)" class="note" v-for="note in projectNote.notes" :key="note.id">
          <v-list-tile-title v-text="note.label"></v-list-tile-title>
        </v-list-tile>
      </v-list-group>
    </template>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  computed: {
    active () {
      return this.$store.getters.activeNote
    },
    projectNotes () {
      const formatNote = note => {
        return {
          id: note.id,
          label: note.headings[0].text
        }
      }
      const projectNotes = this.$store.getters['projectNotes'].map((projectNote) => {
        return {
          active: this.activeNoteProject === projectNote.project.fullPath,
          project: projectNote.project,
          notes: _.sortBy(projectNote.notes.map(formatNote), ['label'])
        }
      })
      return _.sortBy(projectNotes, ['project.name'])
    },
    activeNoteProject () {
      return this.active ? this.active.project.fullPath : ''
    }
  },
  methods: {
    activateNote (id) {
      this.$router.push('/')
      this.$store.dispatch('activateNote', id)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
