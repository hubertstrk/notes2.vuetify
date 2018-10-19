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

    <div class="display-1">Code</div>
    <div class="subheading">Theme</div>
    <div>
      <v-select v-model="codeTheme" :items="codeThemeItems" label="Code Snippet Theme" solo></v-select>
    </div>

  </div>
</template>

<script>
import CodeThemes from '@js/code-themes'
import EditorThemes from '@js/editor-themes'

export default {
  name: 'Appearance',
  data () {
    return {}
  },
  computed: {
    codeThemeItems () {
      console.info(CodeThemes)
      return CodeThemes.map(x => x.label)
    },
    editorThemeItems () {
      console.info(EditorThemes)
      return EditorThemes.map(x => x.label)
    },
    currentAppTheme () {
      return this.$store.state.editor.settings.appTheme
    },
    codeTheme: {
      get () {
        const theme = CodeThemes.find(x => x.name === this.$store.state.editor.settings.codeTheme)
        return theme ? theme.label : ''
      },
      set (label) {
        const theme = CodeThemes.find(x => x.label === label)
        this.$store.dispatch('setCodeTheme', theme.name)
      }
    },
    editorTheme: {
      get () {
        const theme = EditorThemes.find(x => x.name === this.$store.state.editor.settings.editorTheme)
        return theme ? theme.label : ''
      },
      set (label) {
        const theme = EditorThemes.find(x => x.label === label)
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
