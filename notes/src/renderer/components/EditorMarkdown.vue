<template>
  <div class="editor-text">
    <div class="editor-toolbar" id="editor-toolbar">
      <v-btn small flat icon @click="zoom(1)">
        <v-icon>zoom_in</v-icon>
      </v-btn>
      <v-btn small flat icon @click="zoom(-1)">
        <v-icon>zoom_out</v-icon>
      </v-btn>
    </div>
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
import {mapState} from 'vuex'

import _ from 'lodash'
import Editor from 'vue2-ace-editor'
import {SizeMixin} from './SizeMixin.js'

export default {
  name: 'editor-markdown',
  mixins: [SizeMixin],
  props: ['elements'],
  data: () => ({
    editor: null
  }),
  computed: {
    ...mapState({
      active: state => state.editor.active,
      theme: state => state.editor.settings.editorTheme,
      editorFontSize: state => state.editor.settings.editorFontSize,
      displayFoldWidgets: state => state.editor.settings.displayFoldWidgets,
      highlightActiveLine: state => state.editor.settings.highlightActiveLine
    })
  },
  methods: {
    storeNote (text) {
      this.updateNote(text)
      this.writeNote()
    },
    editorInit (editor) {
      this.editor = editor
      editor.setWrapBehavioursEnabled(true)
      editor.setShowInvisibles(false)
      editor.setShowFoldWidgets(this.displayFoldWidgets)
      editor.setShowPrintMargin(false)
      editor.setFontSize(this.editorFontSize)
      editor.setHighlightGutterLine(false)
      editor.getSession().setUseWrapMode(true)
      editor.getSession().setUseSoftTabs(true)
      editor.setHighlightActiveLine(this.highlightActiveLine)
      editor.setAnimatedScroll()
      this.editor.resize()
    },
    updateNote: _.debounce(function (text) {
      this.$store.dispatch('updateNoteText', text)
    }, 50),
    writeNote: _.debounce(function () {
      this.$store.dispatch('writeCurrentNote')
    }, 3000),
    zoom (value) {
      this.$store.dispatch('setEditorFontSize', this.editorFontSize + value)
    }
  },
  watch: {
    editorFontSize (value) {
      this.editorInit(this.editor)
    },
    displayFoldWidgets () {
      this.editorInit(this.editor)
    },
    highlightActiveLine () {
      this.editorInit(this.editor)
    }
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
  flex-direction: column;
  background-color: white;
}
.editor-toolbar {
  height: 40px;
  display: flex;
  align-items: center;
}
</style>
