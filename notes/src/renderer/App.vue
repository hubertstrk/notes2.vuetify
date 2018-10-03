<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer dark fixed :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" app>
        <v-list>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Notes</v-list-tile-title>
          </v-list-tile>
          <v-divider></v-divider>
          <template v-for="location in notes">
            <v-list-group no-action sub-group :key="location.location">
              <v-list-tile slot="activator">
                <v-list-tile-title>{{location.label}}</v-list-tile-title>
              </v-list-tile>

              <v-list-tile v-for="(note, i) in location.children" :key="i">
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
        <v-container fluid fill-height>
          <v-slide-y-transition mode="out-in">
            <router-view></router-view>
          </v-slide-y-transition>
        </v-container>
      </v-content>
      
      <v-navigation-drawer temporary fixed :right="right" v-model="rightDrawer" >
        <v-list>
          <v-list-tile @click.native="right = !right">
            <v-list-tile-action>
              <v-icon light>compare_arrows</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
    </v-app>
  </div>
</template>

<script>
  export default {
    name: 'notes',
    data: () => ({
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        { icon: 'apps', title: 'Welcome', to: '/' },
        { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' }
      ],
      miniVariant: false,
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
        return notesByLocation.map((note) => {
          return {
            label: note.location.name,
            children: note.notes.map((x) => {
              return { label: x.headings.length === 0 ? x.text.substring(0, 30) : x.headings[0].text }
            })
          }
        })
      }
    },
    mounted () {
      this.$store.commit('loadNotes')
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
  /* Global CSS */
</style>
