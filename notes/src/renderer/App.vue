<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer class="drawer" dark fixed :clipped="clipped" v-model="drawer" app>
        <v-list>
          
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Notes</v-list-tile-title>
          </v-list-tile>
          
          <v-divider></v-divider>
          
          <template v-for="location in notes">
            <v-list-group prepend-icon="folder_open" v-model="location.active" :key="location.location">
              
              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title>{{location.locationName}}</v-list-tile-title>
                  <!-- <v-list-tile-sub-title><h5><i>{{ location.locationPath }}</i></h5></v-list-tile-sub-title> -->
                </v-list-tile-content>
              </v-list-tile>
             
              <v-list-tile @click="activateNote(note.id)" class="note" v-for="(note, i) in location.children" :key="i">
                <v-list-tile-avatar>
                  <!-- leave empty -->
                </v-list-tile-avatar>
                <v-list-tile-title v-text="note.label"></v-list-tile-title>
              </v-list-tile>

            </v-list-group>
          </template>

          <v-divider></v-divider>
          
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>delete</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Trash</v-list-tile-title>
          </v-list-tile>

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
    ]
  }),
  computed: {
    notes () {
      const notesByLocation = this.$store.getters['notesByLocation']

      const formatNote = note => { return {id: note.id, label: note.headings.length === 0 ? note.text.substring(0, 30) : note.headings[0].text} }

      return notesByLocation.map((locationNotes) => {
        return {
          active: false,
          locationName: locationNotes.location.name,
          locationPath: locationNotes.location.path,
          children: _.sortBy(locationNotes.notes.map(formatNote), ['label'])
        }
      })
    }
  },
  methods: {
    activateNote (id) {
      this.$store.commit('activateNote', id)
    }
  },
  mounted () {
    this.$store.dispatch('ensureUserSettings')
      .then(() => {
        return this.$store.dispatch('readLocations')
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
