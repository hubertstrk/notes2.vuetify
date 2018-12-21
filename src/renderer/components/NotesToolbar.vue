<template>
 <v-list>
  <v-list-tile>
    <v-list-tile-title><h2>Notes</h2></v-list-tile-title>
    <v-btn @click="$router.push('new-note')" flat icon color="white">
      <v-icon>playlist_add</v-icon>
    </v-btn>
    <v-btn :disabled="!activeNote" @click="showModal = true" flat icon color="white">
      <v-icon>delete_outline</v-icon>
    </v-btn>
  </v-list-tile>
  
  <v-dialog v-model="showModal" width="500">
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>Delete Note</v-card-title>
      <v-card-text>Are you sure you want to delete the current note?</v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="warning" flat @click="deleteNote">Yes</v-btn>
        <v-btn color="primary" flat @click="showModal = false">No</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-list>
</template>

<script>
export default {
  data: () => ({
    showModal: false
  }),
  computed: {
    activeNote () {
      return this.$store.getters['editor/activeNote']
    },
    activeNoteTitle () {
      return this.activeNote ? this.activeNote.headings[0].text : ''
    }
  },
  methods: {
    deleteNote () {
      this.showModal = false
      this.$store.dispatch('editor/deleteNote')
    }
  }
}
</script>

<style lang="css" scoped>
</style>
