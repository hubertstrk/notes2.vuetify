<template>
  <div class="synchronization-component">
    <div class="display-3">Import Projects</div>
    <div class="subheading">Import all projects from the selected location.</div>
    
    <v-btn @click="openFolder" color="primary">Select Location</v-btn>

    <v-btn :disabled="selectedPath === ''" @click="importProjects" color="primary">Import Projects</v-btn>
    <div class="grey--text text--darken-1">Import projects from <kbd>{{hintPath}}</kbd></div>

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
.synchronization-component {
  padding: 20px;
}
.synchronization-component > * {
  margin-bottom: 10px;
}
</style>