<template>
  <div class="editor-text">
    <div :style="scrollable">
      <Editor 
        id="aceeditor"
        @init="editorInit"
        ref="aceeditor"
        :value="active ? active.text : ''"
        @input="storeNote"
        lang="markdown"
        :theme="theme ? theme : 'chrome'"
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

import 'brace/theme/chrome'
import 'brace/theme/dawn'
import 'brace/theme/eclipse'
import 'brace/theme/solarized_dark'
import 'brace/theme/solarized_light'
import 'brace/theme/cobalt'
import 'brace/theme/terminal'
import 'brace/theme/tomorrow'

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
    active () {
      return this.$store.state.editor.active
    },
    theme () {
      return this.$store.state.editor.settings.editorTheme
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
