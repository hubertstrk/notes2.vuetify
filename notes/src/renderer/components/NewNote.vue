<template>
  <div class="note-component">
    <div class="display-3">New Note</div>
    <div class="subheading">To create a new note you need to select a project.</div>
    <div>
      <v-list>
        <v-list-tile :key="index" v-for="(location, index) in locations" class="selectable" avatar>
          <v-list-tile-avatar>
            <v-icon class="grey lighten-1 white--text">folder</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="location.fullPath"></v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-checkbox :input-value="selectedLocation.fullPath === location.fullPath" @click="onSelect(location)"></v-checkbox>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </div>
    <div>
      <v-btn @click="createNote" color="primary" :disabled="!this.selectedLocation.fullPath">Add Note</v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NewNote',
    props: {
    },
    data () {
      return {
        selectedLocation: {fullPath: ''}
      }
    },
    methods: {
      onSelect (location) {
        this.selectedLocation = location
      },
      createNote () {
        if (!this.selectedLocation.fullPath) return
        this.$router.push('/')
        this.$store.dispatch('createNote', this.selectedLocation)
      }
    },
    computed: {
      locations () {
        return this.$store.state.editor.locations
      }
    },
    mounted () {
    }
  }
</script>

<style lang="css" scoped>
.selectable:hover {
  background-color: rgb(231, 231, 231);
}
.note-component {
  padding: 20px;
}
.note-component > * {
  margin-bottom: 20px;
}
hr {margin: 16px 0;}
</style>