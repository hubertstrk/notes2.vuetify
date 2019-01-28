<template>
  <v-list subheader>
    <v-list-group v-model="projectNote.active" :key="projectNote.project.fullPath" v-for="projectNote in projectNotes">
      <v-list-tile slot="activator">
        <v-badge right>
          <span slot="badge">{{projectNote.notes.length}}</span>
            <v-list-tile-content>
              <v-list-tile-title>{{projectNote.project.name}}</v-list-tile-title>
            </v-list-tile-content>
          </v-badge>
      </v-list-tile>
      <transition-group name="list" tag="div">
        <v-list-tile @click="activateNote(note.id)" class="note" :class="{'active': activeNote && note.id === activeNote.id }" v-for="note in projectNote.notes" :key="note.id">
          <v-list-tile-title v-text="note.title" :class="{'primary--text': activeNote && note.id === activeNote.id }"></v-list-tile-title>
        </v-list-tile>
      </transition-group>
    </v-list-group>
  </v-list>
</template>

<script>
import _ from 'lodash'

export default {
  data () {
    return {
      activeBuffer: ''
    }
  },
  computed: {
    activeNote () {
      return this.$store.getters['editor/activeNote']
    },
    projectNotes () {
      const formatNote = note => {
        return {
          id: note.id,
          title: note.headings[0].text
        }
      }
      const projectNotes = this.$store.getters['editor/projectNotes'].map((projectNote) => {
        return {
          active: this.activeNoteProject === projectNote.project.fullPath,
          project: projectNote.project,
          notes: _.sortBy(projectNote.notes.map(formatNote), ['title'])
        }
      })
      return _.sortBy(projectNotes, ['project.name'])
    },
    activeNoteProject () {
      if (this.activeNote) {
        this.activeBuffer = this.activeNote.project.fullPath
      }
      return this.activeBuffer
    }
  },
  methods: {
    activateNote (id) {
      this.$router.push('/')
      this.$store.dispatch('editor/activateNote', id)
    }
  }
}
</script>

<style lang="css" scoped>
.list-enter-active, .list-leave-active {
  transition: all .6s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translatex(200px);
}
.active {
  /* background-color: rgb(90, 90, 90); */
}
</style>
