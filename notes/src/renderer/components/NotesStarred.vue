<template>
  <v-list>
    <v-divider></v-divider>
    <v-list-group>
      <v-list-tile slot="activator">
        <v-list-tile-action>
          <v-icon color="yellow darken-2">star</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Starred</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="activateNote(note.id)" class="note" v-for="note in starred" :key="note.id">
        <v-list-tile-title v-text="note.headings[0].text"></v-list-tile-title>
      </v-list-tile>
    </v-list-group>
    <v-divider></v-divider>
  </v-list>
</template>

<script>
export default {
  computed: {
    starred () {
      return this.$store.getters.starredNotes
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

<style>

</style>
