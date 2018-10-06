<template>
  <div class="synchronization-component">
    <div class="display-3">Location</div>
    <div class="subheading">To make your note available on all devices you can choose a folder which is synchronized with a cloud storage such as 
      the Google Drive or Dropbox. If you want to keep your data locally choose a folder on your computer which is not synchronized with a cloud storage.
    </div>
    
    <v-btn @click="openFolder" color="primary">Choose Sync Location</v-btn>
    <div class="grey--text text--darken-1"><i>{{syncLocation}}</i></div>
    <v-text-field v-model="folderName" label="Folder Name" required ></v-text-field>

    <v-btn :disabled="storeEnabled" @click="addLocation" color="primary">Add Location</v-btn>
  </div>
</template>

<script>
const {dialog} = require('electron').remote
export default {
  name: 'synchronization',
  data () {
    return {
      syncLocation: '',
      folderName: ''
    }
  },
  methods: {
    openFolder () {
      dialog.showOpenDialog({
        title: 'Select Folder',
        properties: ['openDirectory']
      }, (folders) => {
        if (folders && folders.length === 1) {
          this.syncLocation = folders[0]
        }
      })
    },
    addLocation () {
      this.$store.dispatch('addLocation', {location: this.syncLocation, folder: this.folderName})
        .catch((error) => {
          console.error(error.message)
        })
    }
  },
  computed: {
    storeEnabled () {
      return this.syncLocation === '' || this.folderName === ''
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
  margin-bottom: 20px;
}
</style>