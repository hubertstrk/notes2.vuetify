<template>
  <div class="import-component">
    <div class="display-3">Import Projects</div>
    <div class="subheading">Import all projects from the selected location. 
      This might be the case if you want to set up your notes for the first time on a new device. </div>
    
    <v-btn @click="openFolder" color="primary">Select Location</v-btn>
    <br>
    <v-btn :disabled="selectedPath === ''" @click="importProjects" color="primary">
       Import Projects
       <v-icon right dark>sync</v-icon>
    </v-btn>
    <div class="grey--text text--darken-1">Import projects from <i>{{hintPath}}</i></div>
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
      this.$router.push('/')
      this.$store.dispatch('importProjects', this.selectedPath)
        .catch((error) => {
          console.error(error.message)
        })
    }
  },
  computed: {
    hintPath () {
      return this.selectedPath ? this.selectedPath : 'my path'
    }
  },
  watch: {
    existingLocation (value) {
      if (!value) {

      }
    }
  },
  components: {
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