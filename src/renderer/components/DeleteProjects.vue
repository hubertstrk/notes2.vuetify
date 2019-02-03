<template>
  <div class="components" :style="scrollable">
    <div class="font-weight-light display-2">Delete Project</div>
    <v-alert dismissible :value="true" type="error">Deleting a project deletes all containing notes. This is an unrecoverable action.</v-alert>
    <ProjectSelection error :projects="sortedProjects" v-model="project" />
    <v-btn @click="onDelete" color="error" :disabled="!this.selectedProject">Delete Project</v-btn>
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
      selectedProject: null
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
      'deleteProject'
    ]),
    onDelete () {
      this.deleteProject(this.selectedProject)
    }
  }
}
</script>

<style lang="css" scoped>
.components > * { margin-bottom: 20px; }
</style>