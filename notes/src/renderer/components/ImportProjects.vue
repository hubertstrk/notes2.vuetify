<template>
  <div class="import-component">
    <div class="display-2">Import Projects</div>
    <div class="subheading">Import all projects from the selected location. 
      This might be the case if you want to set up your notes for the first time on a new device. </div>
    <v-btn @click="openFolder" color="primary">Select Location</v-btn>
    <br>
    <v-btn @click="importProjects" color="primary">
      <v-icon left>sync</v-icon>
       Import Projects
    </v-btn>
    <div class="primary--text">Import projects from <i>{{hintPath}}</i></div>
  </div>
</template>

<script>
const {dialog} = require('electron').remote
export default {
  name: 'synchronization',
  data () {
    return {
      selectedPath: ''
    }
  },
  methods: {
    openFolder () {
      dialog.showOpenDialog({
        title: 'Select Folder',
        properties: ['openDirectory']
      }, (folders) => {
        if (folders && folders.length === 1) {
          this.selectedPath = folders[0]
        }
      })
    },
    importProjects () {
      if (!this.selectedPath) return
      this.$router.push('/')
      this.$store.dispatch('editor/importProjects', this.selectedPath)
        .catch(({message}) => {
          console.error(message)
          this.$store.dispatch('editor/notify', {message, severity: 'error'})
        })
    }
  },
  computed: {
    hintPath () {
      return this.selectedPath ? this.selectedPath : 'my path'
    }
  }
}
</script>

<style lang="css" scoped>
.import-component {
  padding: 20px;
}
.import-component > * {
  margin-bottom: 10px;
}
</style>