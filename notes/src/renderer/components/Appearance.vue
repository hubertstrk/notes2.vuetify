<template>
  <div class="theme-component">
    <div class="display-3">Appearance</div>

    <div class="display-1">Editor</div>
    <div class="subheading">Theme</div>
    <div>
      <v-select v-model="selectedEditorTheme" :items="editorThemeItems" label="Editor Theme" solo></v-select>
    </div>
    
    <v-switch label="Mark Current Line" v-model="highlightActiveLine"></v-switch>
    <v-switch label="Display fold widgets" v-model="displayFoldWidgets"></v-switch>

    <div class="display-1">Code</div>
    <div class="subheading">Theme</div>
    <div>
      <v-select v-model="selectedCodeTheme" :items="codeThemeItems" label="Code Snippet Theme" solo></v-select>
    </div>

  </div>
</template>

<script>
import {mapState} from 'vuex'

import CodeThemes from '@js/code-themes'
import EditorThemes from '@js/editor-themes'

export default {
  name: 'Appearance',
  data () {
    return {
      namespace: 'editor.settings'
    }
  },
  computed: {
    ...mapState({
      codeTheme: state => state.editor.settings.codeTheme,
      editorTheme: state => state.editor.settings.editorTheme,
      foldWidgets: state => state.editor.settings.displayFoldWidgets,
      highlightLine: state => state.editor.settings.highlightActiveLine
    }),
    codeThemeItems () {
      return CodeThemes.map(x => x.label)
    },
    editorThemeItems () {
      return EditorThemes.map(x => x.label)
    },
    selectedCodeTheme: {
      get () {
        const theme = CodeThemes.find(x => x.name === this.codeTheme)
        return theme ? theme.label : ''
      },
      set (label) {
        const theme = CodeThemes.find(x => x.label === label)
        this.$store.dispatch('setCodeTheme', theme.name)
      }
    },
    selectedEditorTheme: {
      get () {
        const theme = EditorThemes.find(x => x.name === this.editorTheme)
        return theme ? theme.label : ''
      },
      set (label) {
        const theme = EditorThemes.find(x => x.label === label)
        this.$store.dispatch('setEditorTheme', theme.name)
      }
    },
    displayFoldWidgets: {
      get () { return this.foldWidgets },
      set (value) { this.$store.dispatch('setDisplayFoldWidgets', value) }
    },
    highlightActiveLine: {
      get () { return this.highlightLine },
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
