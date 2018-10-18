<template>
  <div class="theme-component">
    <div class="display-3">Appearance</div>

    <div class="display-1">Editor</div>
    <div class="subheading">Theme</div>
    <div>
      <v-select v-model="editorTheme" :items="editorThemeItems" label="Editor Theme" solo></v-select>
    </div>
    
    <v-switch label="Mark Current Line" v-model="highlightActiveLine"></v-switch>
    <v-switch label="Display fold widgets" v-model="displayFoldWidgets"></v-switch>

    <div class="display-1">Code Theme</div>
    <div class="subheading">Select a theme for the code snippets.</div>
    <div>
      <v-select v-model="codeTheme" :items="codeThemeItems" label="Code Snippet Theme" solo></v-select>
    </div>

  </div>
</template>

<script>
import {AppThemeMixin} from './AppThemeMixin'

export default {
  name: 'Appearance',
  data: () => ({
    codeThemes: [
      {name: 'default', label: 'Default'},
      {name: 'arta', label: 'Arta'},
      {name: 'atom-one-dark', label: 'Atom One Dark'},
      {name: 'dracula', label: 'Dracula'},
      {name: 'github', label: 'Github'},
      {name: 'monokai', label: 'Monokai'},
      {name: 'sunburst', label: 'Sunburst'},
      {name: 'railscasts', label: 'Railscasts'},
      {name: 'solarized-dark', label: 'Solarized Dark'},
      {name: 'tomorrow-night-blue', label: 'Tomorrow Night Blue'},
      {name: 'vs', label: 'Visual Studio'},
      {name: 'vs2015', label: 'Visual Studio Dark'},
      {name: 'zenburn', label: 'Zenburn'}
    ],
    editorThemes: [
      // light
      {label: 'Chrome', name: 'chrome'},
      {label: 'SQL Server', name: 'sqlserver'},
      {label: 'Tomorrow', name: 'tomorrow'},
      {label: 'Solarized Light', name: 'solarized_light'},
      // dark
      {label: 'Cobalt', name: 'cobalt'},
      {label: 'Monokai', name: 'monokai'},
      {label: 'Solarized Dark', name: 'solarized_dark'},
      {label: 'Terminal', name: 'terminal'},
      {label: 'Vibrant Ink', name: 'vibrant_ink'}
    ]
  }),
  mixins: [AppThemeMixin],
  computed: {
    codeThemeItems () {
      return this.codeThemes.map(x => x.label)
    },
    editorThemeItems () {
      return this.editorThemes.map(x => x.label)
    },
    currentAppTheme () {
      return this.$store.state.editor.settings.appTheme
    },
    codeTheme: {
      get () {
        const theme = this.codeThemes.find(x => x.name === this.$store.state.editor.settings.codeTheme)
        return theme ? theme.label : ''
      },
      set (label) {
        const theme = this.codeThemes.find(x => x.label === label)
        this.$store.dispatch('setCodeTheme', theme.name)
      }
    },
    editorTheme: {
      get () {
        const theme = this.editorThemes.find(x => x.name === this.$store.state.editor.settings.editorTheme)
        return theme ? theme.label : ''
      },
      set (label) {
        const theme = this.editorThemes.find(x => x.label === label)
        this.$store.dispatch('setEditorTheme', theme.name)
      }
    },
    displayFoldWidgets: {
      get () { return this.$store.state.editor.settings.displayFoldWidgets },
      set (value) { this.$store.dispatch('setDisplayFoldWidgets', value) }
    },
    highlightActiveLine: {
      get () { return this.$store.state.editor.settings.highlightActiveLine },
      set (value) { this.$store.dispatch('setHighlightActiveLine', value) }
    }
  }
}
</script>

<style lang="css" scoped>
.theme-component > * {
  margin-bottom: 20px;
}
</style>
