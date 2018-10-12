<template>
  <div class="editor-text" :style="scrollable">
    <Editor 
      id="aceeditor"
      ref="aceeditor"
      v-model="markdown"
      @init="editorInit"
      lang="markdown"
      theme="github"
      width="100%" 
      height="100%">
    </Editor>
  </div>
</template>

<script>
import Editor from 'vue2-ace-editor'

import 'brace/ext/language_tools'
import 'brace/mode/html'
import 'brace/mode/markdown'
import 'brace/theme/github'
import 'brace/theme/ambiance'
import 'brace/theme/sqlserver'

import {SizeMixin} from './SizeMixin.js'

export default {
  name: 'editor-markdown',
  mixins: [SizeMixin],
  props: ['elements'],
  data () {
    return {
      name: 'editor-markdown'
    }
  },
  computed: {
    markdown: {
      get () {
        if (!this.$store.state.editor.active) return ''
        return this.$store.state.editor.active.text
      },
      set (text) {
        this.$store.dispatch('updateNoteText', text)
      }
    }
  },
  methods: {
    editorInit (editor) {
      editor.setWrapBehavioursEnabled(true)
      editor.setShowInvisibles(false)
      editor.setShowFoldWidgets(true)
      editor.setShowPrintMargin(false)
      editor.setFontSize(12)
      editor.setHighlightGutterLine(true)
      editor.getSession().setUseWrapMode(true)
      editor.getSession().setUseSoftTabs(true)
      editor.setAnimatedScroll()
    }
  },
  components: {
    Editor
  }
}
</script>

<style lang="css" scoped>
.editor-text {
  min-width: 300px; 
  flex: 2;
  background-color: blueviolet;
}
</style>
