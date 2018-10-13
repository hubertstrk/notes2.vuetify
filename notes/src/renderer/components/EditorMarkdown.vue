<template>
  <div class="editor-text">
    <div :style="scrollable">
      <Editor 
        id="aceeditor"
        @init="editorInit"
        ref="aceeditor"
        :value="activeNoteText"
        @input="storeNote"
        lang="markdown"
        theme="github"
        width="100%" 
        height="100%">
      </Editor>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
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
      name: 'editor-markdown',
      toggle_multiple: [0, 1, 2, 3, 4, 5]
    }
  },
  computed: {
    activeNoteText () {
      return this.$store.state.editor.active ? this.$store.state.editor.active.text : ''
    }
  },
  methods: {
    storeNote (text) {
      this.updateNote(text)
      this.writeNote()
    },
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
    },
    updateNote: _.debounce(function (text) {
      this.$store.dispatch('updateNoteText', text)
    }, 50),
    writeNote: _.debounce(function () {
      this.$store.dispatch('writeCurrentNote')
    }, 5000)
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
}
</style>
