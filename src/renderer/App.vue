<template>
  <div id="app" >
    <v-app>
      <v-navigation-drawer dark class="left-drawer" fixed :clipped="clipped" v-model="drawer" app>
        <NotesToolbar />
        <NotesStarred />
        <NotesList />
      </v-navigation-drawer>
      <v-toolbar id="app-tool-bar" fixed app :clipped-left="clipped">
        <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-btn icon @click.native.stop="clipped = !clipped">
          <v-icon>web</v-icon>
        </v-btn>
        <v-toolbar-title v-text="title"></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click.native.stop="rightDrawer = !rightDrawer">
          <v-icon>settings</v-icon>
        </v-btn>
      </v-toolbar>
      <v-content>
        <v-container fluid >
          <v-slide-y-transition mode="out-in">
            <router-view></router-view>
          </v-slide-y-transition>
        </v-container>
      </v-content>
      <v-navigation-drawer :class="rightDrawer ? 'right-drawer-open' : 'right-drawer-closed'" temporary fixed :right="right" v-model="rightDrawer">
        <Drawer></Drawer>
      </v-navigation-drawer>

      <Notifications />

    </v-app>
  </div>
</template>

<script>
import NotesStarred from '@/components/NotesStarred'
import NotesToolbar from '@/components/NotesToolbar'
import NotesList from '@/components/NotesList'
import Drawer from '@/components/Drawer'

export default {
  name: 'notes',
  data: () => ({
    clipped: false,
    drawer: true,
    fixed: false,
    right: true,
    rightDrawer: false,
    title: ''
  }),
  computed: {
    appTheme () {
      return this.$store.state.editor.settings.appTheme
    }
  },
  mounted () {
    this.$store.dispatch('editor/ensureUserSettings')
      .then(() => {
        return this.$store.dispatch('editor/readProjects')
      })
      .then(() => {
        return this.$store.dispatch('editor/readNotes')
      })
  },
  watch: {
    appTheme (value) {
      this.$vuetify.theme.primary = this.appTheme
    }
  },
  components: {
    NotesToolbar,
    NotesList,
    Drawer,
    NotesStarred
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
  /* Global CSS */
</style>

<style lang="css" scoped>
.left-drawer {
  background-color: #35495e;
  color: #42b883;
}
.right-drawer-open {
  width: 400px !important;
}
.right-drawer-closed {
  width: 0px !important;
}
</style>
