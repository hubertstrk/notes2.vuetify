<template>
   <v-list v-if="projects.length > 0" two-line>
    <v-list-tile :key="i" v-for="(project, i) in projects" class="selectable" avatar>
      <v-list-tile-avatar>
        <v-icon class="grey lighten-1 white--text">folder</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title v-html="project.name"></v-list-tile-title>
        <v-list-tile-sub-title v-html="project.path"></v-list-tile-sub-title>
      </v-list-tile-content>
      <v-list-tile-action>
        <v-checkbox :input-value="fullPath(project) === fullPath(value)" @click="select(project)"></v-checkbox>
      </v-list-tile-action>
    </v-list-tile>
  </v-list>
  <div v-else>
    <v-alert :value="true" type="info">Nothing to select yet</v-alert>
  </div>
</template>

<script>
import path from 'path'

export default {
  props: {
    projects: Array,
    value: Object
  },
  methods: {
    fullPath (project) {
      if (!project) return
      return path.join(project.path, project.name)
    },
    select (project) {
      this.$emit('input', {path: project.path, name: project.name})
    }
  }
}
</script>

<style>
</style>
