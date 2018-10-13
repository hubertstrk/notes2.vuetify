<template>
  <div class="synchronization-component">
    <div class="display-3">Create Project</div>
    <div class="subheading">To make your projects available on all devices you can choose a folder which is synchronized with a cloud storage such as 
      the Google Drive or Dropbox. If you want to keep your data locally choose a folder on your computer which is not synchronized with a cloud storage.
    </div>
    
    <v-btn @click="openFolder" color="primary">Select Location</v-btn>

    <v-text-field v-model="selectedName" label="Name" required ></v-text-field>

    <v-btn :disabled="this.selectedPath === '' && this.selectedName === ''" @click="addProject" color="primary">Add Project</v-btn>

    <div class="grey--text text--darken-3">Create project with name <i>{{hintName}}</i> at location <i>{{hintPath}}</i></div>

  </div>
</template>

<script>
const {dialog} = require('electron').remote
export default {
  name: 'NewProject',
  data () {
    return {
      selectedPath: '',
      selectedName: ''
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
    addProject () {
      this.$router.push('/')
      this.$store.dispatch('addProject', {path: this.selectedPath, name: this.selectedName})
        .catch((error) => {
          console.error(error.message)
        })
    }
  },
  computed: {
    hintPath () {
      return this.selectedPath ? this.selectedPath : 'my path'
    },
    hintName () {
      return this.selectedName ? this.selectedName : 'my name'
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