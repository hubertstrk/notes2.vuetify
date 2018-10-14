<template>
  <div id="app" >
    <v-app>
      <v-navigation-drawer dark class="drawer" fixed :clipped="clipped" v-model="drawer" app>
        <v-list>
          <NotesTitle />
          <v-divider></v-divider>
          <NotesList />
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
      <v-navigation-drawer :class="rightDrawer ? 'right-drawer-open' : 'right-drawer-closed'" fixed temporary :right="right" v-model="rightDrawer">
        <RightDrawer></RightDrawer>
      </v-navigation-drawer>
    </v-app>
  </div>
</template>

<script>
import NotesTitle from '@/components/NotesTitle'
import NotesList from '@/components/NotesList'
import RightDrawer from '@/components/Drawer.vue'

export default {
  name: 'notes',
  data: () => ({
    clipped: false,
    drawer: true,
    fixed: false,
    right: true,
    rightDrawer: false,
    title: 'Editor'
  }),
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
    NotesTitle,
    NotesList,
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
.right-drawer-open {
  width: 500px !important;
}
.right-drawer-closed {
  width: 0px !important;
}
</style>
