<template>
  <div class="note-component">
    <div class="display-2">New Note</div>
    <div class="subheading">To create a new note you need to select a project.</div>
    <div>
      <v-list>
        <v-list-tile :key="project.fullPath" v-for="project in projects" class="selectable" avatar>
          <v-list-tile-avatar>
            <v-icon class="grey lighten-1 white--text">folder</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="project.fullPath"></v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-checkbox :input-value="selectedProject.fullPath === project.fullPath" @click="onSelect(project)"></v-checkbox>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </div>
    <div>
      <v-btn @click="createNote" color="primary" :disabled="!this.selectedProject.fullPath">Add Note</v-btn>
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
        selectedProject: {fullPath: ''}
      }
    },
    methods: {
      onSelect (location) {
        this.selectedProject = location
      },
      createNote () {
        if (!this.selectedProject.fullPath) return
        this.$router.push('/')
        this.$store.dispatch('createNote', this.selectedProject)
      }
    },
    computed: {
      projects () {
        return this.$store.state.editor.projects
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