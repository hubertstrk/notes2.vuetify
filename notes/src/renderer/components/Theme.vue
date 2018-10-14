<template>
  <div class="theme-component">
    <div class="display-3">Appearance</div>

    <div class="display-1">App Theme</div>
    <div class="subheading">Select the app's theme.</div>
    <div>
      <v-select :class="appThemeStyle" v-model="appTheme" :items="appThemeItems" label="Editor Theme" solo></v-select>
    </div>

    <div class="display-1">Editor Theme</div>
    <div class="subheading">Select the editor's theme.</div>
    <div>
      <v-select :class="appThemeStyle" v-model="editorTheme" :items="editorThemeItems" label="Editor Theme" solo></v-select>
    </div>
  </div>
</template>

<script>
import {AppThemeMixin} from './AppThemeMixin'

export default {
  name: 'Theme',
  data: () => ({
    addThemes: [
      {label: 'Dark', name: 'dark'},
      {label: 'Light', name: 'light'}
    ],
    editorThemes: [
      {label: 'Chrome', name: 'chrome'},
      {label: 'Dawn', name: 'dawn'},
      {label: 'Eclipse', name: 'eclipse'},
      {label: 'Solarized Dark', name: 'solarized_dark'},
      {label: 'Cobalt', name: 'cobalt'},
      {label: 'Terminal', name: 'terminal'},
      {label: 'Tomorrow', name: 'tomorrow'}
    ]
  }),
  mixins: [AppThemeMixin],
  computed: {
    appThemeItems () {
      return this.addThemes.map(x => x.label)
    },
    editorThemeItems () {
      return this.editorThemes.map(x => x.label)
    },
    currentAppTheme () {
      return this.$store.state.editor.settings.appTheme
    },
    appTheme: {
      get () {
        const theme = this.addThemes.find(x => x.name === this.$store.state.editor.settings.appTheme)
        return theme ? theme.label : ''
      },
      set (label) {
        const theme = this.addThemes.find(x => x.label === label)
        this.$store.dispatch('setAppTheme', theme.name)
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
    }
  }
}
</script>

<style lang="css" scoped>
.theme-component > * {
  margin-bottom: 20px;
}
</style>
