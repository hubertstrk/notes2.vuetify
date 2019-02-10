<template>
  <div class="components" :style="scrollable">
    <div class="font-weight-light display-2">Manage Project</div>
    <!-- <v-alert dismissible :value="true" type="error">Deleting a project deletes all containing notes. This is an unrecoverable action.</v-alert> -->
    <ProjectSelection error :projects="sortedProjects" v-model="project" />
    <v-btn @click="showModal = true" color="primary" :disabled="!this.selectedProject">Rename Project</v-btn>
    <v-btn @click="onDelete" color="error" :disabled="!this.selectedProject">Delete Project</v-btn>

    <v-dialog v-model="showModal" width="600">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Rename project</v-card-title>
        <v-card-text>Choose a new name for the project</v-card-text>
        <v-spacer></v-spacer>
        <v-text-field v-model="selectedProjectName" class="text-field" label="Regular" placeholder="project name" single-line></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" flat @click="onRename">Rename</v-btn>
          <v-btn color="primary" flat @click="showModal = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import _ from 'lodash'

import {mapState, mapActions} from 'vuex'
import {SizeMixin} from './SizeMixin.js'

import Project from '@model/Location'
import ProjectSelection from './ProjectSelection'

export default {
  name: 'DeleteProjects',
  mixins: [SizeMixin],
  components: {
    ProjectSelection
  },
  data () {
    return {
      elements: ['app-tool-bar'],
      selectedProject: null,
      showModal: false,
      selectedProjectName: ''
    }
  },
  computed: {
    project: {
      get () { return this.selectedProject },
      set ({path, name}) { this.selectedProject = new Project(path, name) }
    },
    ...mapState('editor', {
      projects: state => state.projects
    }),
    sortedProjects () {
      return _.sortBy(this.projects, 'name')
    }
  },
  methods: {
    ...mapActions('editor', [
      'deleteProject',
      'renameProject'
    ]),
    onDelete () {
      this.deleteProject(this.selectedProject)
    },
    onRename () {
      return this.renameProject({project: this.selectedProject, name: this.selectedProjectName})
        .then(() => {
          this.showModal = false
        })
    }
  }
}
</script>

<style lang="css" scoped>
.components > * { margin-bottom: 20px; }
.text-field { margin: 0 20px; }
</style>