<template>
  <div class="note-component" :style="scrollable">
    <div class="font-weight-light display-2">New Note</div>
    <div class="subheading">To create a new note you need to select a project.</div>

    <div class="font-weight-light headline"><span>Favorites</span></div>
    <ProjectSelection :projects="sortedFavouriteProjects" v-model="project" />

    <div class="font-weight-light headline"><span>Projects</span></div>
    <ProjectSelection :projects="sortedProjects" v-model="project" />
    
    <v-btn @click="createNote" color="primary" :disabled="!this.selectedProject">Add Note</v-btn>
  </div>
</template>

<script>
import _ from 'lodash'

import {mapState} from 'vuex'
import {SizeMixin} from './SizeMixin.js'

import Project from '@model/Location'
import ProjectSelection from './ProjectSelection'

export default {
  name: 'NewNote',
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
  methods: {
    select ({path, name}) {
      this.selectedProject = new Project(path, name)
    },
    createNote () {
      if (!this.selectedProject) return
      this.$router.push('/')
      this.$store.dispatch('editor/addFavouriteProject', this.selectedProject)
      this.$store.dispatch('editor/createNote', this.selectedProject)
    }
  },
  computed: {
    project: {
      get () { return this.selectedProject },
      set ({path, name}) { this.selectedProject = new Project(path, name) }
    },
    ...mapState('editor', {
      projects: state => state.projects,
      favouriteProjects: state => state.settings.favouriteProjects
    }),
    sortedProjects () {
      return _.sortBy(this.projects, 'name')
    },
    sortedFavouriteProjects () {
      return _.sortBy(this.favouriteProjects, 'name')
    }
  }
}
</script>

<style lang="css" scoped>
.note-component {
  padding: 20px;
}
.note-component > * {
  margin-bottom: 20px;
}
</style>