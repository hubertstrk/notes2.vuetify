<template>
  <div class="theme-component">
    <div class="display-3">Appearance</div>
    <div class="display-1">Editor Theme</div>
    <div class="subheading">Select the editor's theme.</div>
    <div>
      <v-select v-model="theme" :items="items" label="Editor Theme" solo></v-select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Theme',
  data: () => ({
    editorThemes: [
      {label: 'Chrome', name: 'chrome'},
      {label: 'Dawn', name: 'dawn'},
      {label: 'Eclipse', name: 'eclipse'},
      {label: 'Solarized Dark', name: 'solarized_dark'},
      {label: 'Solarized Light', name: 'solarized_light'},
      {label: 'Cobalt', name: 'cobalt'},
      {label: 'Terminal', name: 'terminal'},
      {label: 'Tomorrow', name: 'tomorrow'}
    ]
  }),
  computed: {
    items () {
      return this.editorThemes.map(x => x.label)
    },
    theme: {
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
