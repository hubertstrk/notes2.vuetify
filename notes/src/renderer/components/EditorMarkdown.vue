<template>
  <div class="editor-text">
    <div class="editor-toolbar" id="editor-toolbar">
      <v-btn flat icon @click="zoomIn">
        <v-icon>zoom_in</v-icon>
      </v-btn>
      <v-btn flat icon @click="zoomOut">
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
    active () {
      return this.$store.state.editor.active
    },
    theme () {
      return this.$store.state.editor.settings.editorTheme
    },
    editorFontSize () {
      return this.$store.state.editor.settings.editorFontSize
    },
    displayFoldWidgets () {
      return this.$store.state.editor.settings.displayFoldWidgets
    },
    highlightActiveLine () {
      return this.$store.state.editor.settings.highlightActiveLine
    }
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
    }, 5000),
    zoomIn () {
      this.$store.dispatch('setEditorFontSize', this.editorFontSize + 2)
    },
    zoomOut () {
      this.$store.dispatch('setEditorFontSize', this.editorFontSize - 2)
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
