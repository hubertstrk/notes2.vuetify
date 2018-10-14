<template>
  <div class="editor-text">
    <div :style="scrollable">
      <Editor 
        id="aceeditor" @init="editorInit" 
        :value="active ? active.text : ''" 
        :theme="theme ? theme : 'chrome'"
        @input="storeNote" lang="markdown" 
        width="100%" height="100%">
      </Editor>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import Editor from 'vue2-ace-editor'
import {SizeMixin} from './SizeMixin.js'

export default {
  name: 'editor-markdown',
  mixins: [SizeMixin],
  props: ['elements'],
  data: () => ({}),
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
  min-width: 200px;
  flex: 2;
}
</style>
