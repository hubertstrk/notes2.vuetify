<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer class="drawer" dark fixed :clipped="clipped" v-model="drawer" app>
        <v-list>
          
          <v-list-tile>
            <v-list-tile-title><h2>Notes</h2></v-list-tile-title>
            <v-btn @click="$router.push('/newNote')" flat icon color="white">
              <v-icon>playlist_add</v-icon>
            </v-btn>
            <v-btn :disabled="activeNote === null" @click="showModal = true" flat icon color="white">
              <v-icon>delete_outline</v-icon>
            </v-btn>
          </v-list-tile>
          
          <v-divider></v-divider>
          
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
        </v-list>
      </v-navigation-drawer>
      
      <v-toolbar id="app-tool-bar" fixed app :clipped-left="clipped">
        <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-btn icon @click.native.stop="clipped = !clipped">
          <v-icon>web</v-icon>
        </v-btn>
        <v-toolbar-title v-text="title"></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click.native.stop="rightDrawer = !rightDrawer">
          <v-icon>menu</v-icon>
        </v-btn>
      </v-toolbar>
      
      <v-content>
        <v-container fluid >
          <v-slide-y-transition mode="out-in">
            <router-view></router-view>
          </v-slide-y-transition>
        </v-container>
      </v-content>
      
      <v-navigation-drawer temporary fixed :right="right" v-model="rightDrawer" >
        <RightDrawer></RightDrawer>
      </v-navigation-drawer>

    <v-dialog v-model="showModal" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Delete Note
        </v-card-title>
        <v-card-text>
          Are you sure you want to delete the current note with title '{{activeNoteTitle}}'?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="warning" flat dark @click="deleteNote">
            Yes
          </v-btn>
          <v-btn color="primary" flat dark @click="showModal = false">
            No
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    </v-app>
  </div>
</template>

<script>
import _ from 'lodash'
import RightDrawer from './components/Drawer.vue'

export default {
  name: 'notes',
  data: () => ({
    clipped: false,
    drawer: true,
    fixed: false,
    right: true,
    rightDrawer: false,
    title: 'Editor',
    admins: [
      ['Management', 'people_outline'],
      ['Settings', 'settings']
    ],
    showModal: false
  }),
  computed: {
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
    activeNote () {
      return this.$store.state.editor.active
    },
    activeNoteProject () {
      return this.$store.state.editor.active ? this.$store.state.editor.active.project.fullPath : ''
    },
    activeNoteTitle () {
      return this.$store.state.editor.active ? this.$store.state.editor.active.headings[0].text : ''
    }
  },
  methods: {
    activateNote (id) {
      this.$router.push('/')
      this.$store.dispatch('activateNote', id)
    },
    deleteNote () {
      this.showModal = false
      this.$store.dispatch('deleteNote')
    }
  },
  mounted () {
    this.$store.dispatch('ensureUserSettings')
      .then(() => {
        return this.$store.dispatch('readProjects')
      })
      .then(() => {
        return this.$store.dispatch('readNotes')
      })
  },
  components: {
    RightDrawer
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
  /* Global CSS */
</style>

<style lang="css" scoped>
.drawer {
  /* background-color: #263238; */
}
.note {
  background-color: #616161;
}
</style>
