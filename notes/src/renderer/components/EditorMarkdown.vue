<template>
  <div class="editor-text">
    <div class="toolbar header" id="editor-toolbar">
      <div>
        <v-btn v-if="isActiveStarred" small flat icon @click="toggleStarred"><v-icon color="yellow darken-2">star</v-icon></v-btn>
        <v-btn v-else small flat icon @click="toggleStarred"><v-icon color="grey lighten-1">star</v-icon></v-btn>
      </div>
      <div>
        <v-btn small flat icon @click="zoom(1)"><v-icon>zoom_in</v-icon></v-btn>
        <v-btn small flat icon @click="zoom(-1)"><v-icon>zoom_out</v-icon></v-btn>
        <v-btn small flat icon @click="insert('****', {diffRow: 0, diffColumn: 2})"><v-icon>format_bold</v-icon></v-btn>
        <v-btn small flat icon @click="insert('**', {diffRow: 0, diffColumn: 1})"><v-icon>format_italic</v-icon></v-btn>
        <v-btn small flat icon @click="insert('~~~~', {diffRow: 0, diffColumn: 2})"><v-icon>format_strikethrough</v-icon></v-btn>
        <v-btn small flat icon @click="insert('[Google](www.google.com)', {diffRow: 0, diffColumn: 0})"><v-icon>link</v-icon></v-btn>
        <v-btn small flat icon @click="insert('```js\n\n```', {diffRow: 1, diffColumn: 10})"><v-icon>code</v-icon></v-btn>
        <v-btn small flat icon @click="insert('Tables | Are | Cool\n--- | --- | ---\n*Still* | `renders` | **nicely**\n1 | 2 | 3\n', {diffRow: 0, diffColumn: 0})"><v-icon>grid_on</v-icon></v-btn>
      </div>
    </div>
    <div :style="scrollable">
      <Editor 
        id="aceeditor" @init="editorInit" 
        :value="activeNote ? activeNote.text : ''" 
        :theme="theme ? theme : 'chrome'"
        @input="storeNote" lang="markdown"
        width="100%" height="100%">
      </Editor>
    </div>
    <div class="toolbar footer" id="editor-footer">
      <div></div>
      <div class="caption">Ln {{currentRow}}, Col {{currentColumn}}</div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import Editor from 'vue2-ace-editor'
import {SizeMixin} from './SizeMixin.js'

import { mapState } from 'vuex'
export default {
  name: 'editor-markdown',
  mixins: [SizeMixin],
  props: ['elements'],
  data: () => ({
    editor: null,
    currentRow: 1,
    currentColumn: 1,
    status: ''
  }),
  computed: {
    ...mapState({
      starred: state => state.editor.settings.starred,
      active: state => state.editor.settings.active,
      theme: state => state.editor.settings.editorTheme,
      editorFontSize: state => state.editor.settings.editorFontSize,
      displayFoldWidgets: state => state.editor.settings.displayFoldWidgets,
      highlightActiveLine: state => state.editor.settings.highlightActiveLine
    }),
    activeNote () {
      return this.$store.getters.activeNote
    },
    isActiveStarred () {
      return this.starred ? this.starred.includes(this.active) : false
    }
  },
  methods: {
    storeNote (text) {
      this.updateNote(text)
      this.writeNote()
    },
    editorInit (editor) {
      this.editor = editor
      this.editor.setWrapBehavioursEnabled(true)
      this.editor.setShowInvisibles(false)
      this.editor.setShowFoldWidgets(this.displayFoldWidgets)
      this.editor.setShowPrintMargin(true)
      this.editor.setFontSize(this.editorFontSize)
      this.editor.setHighlightGutterLine(false)
      this.editor.getSession().setUseWrapMode(true)
      this.editor.getSession().setUseSoftTabs(true)
      this.editor.setHighlightActiveLine(this.highlightActiveLine)
      this.editor.setAnimatedScroll()
      this.editor.resize()
      this.editor.setHighlightSelectedWord(false)
      this.editor.showGutter(false)

      this.editor.on('change', () => {
        this.updateMetadata()
      })
      this.editor.selection.on('changeCursor', () => {
        this.updateMetadata()
      })
    },
    updateMetadata () {
      const {row, column} = this.editor.getCursorPosition()
      this.currentRow = row + 1
      this.currentColumn = column + 1
    },
    updateNote: _.debounce(function (text) {
      this.$store.dispatch('updateNoteText', text)
    }, 100),
    writeNote: _.debounce(function () {
      this.$store.dispatch('writeCurrentNote')
    }, 3000),
    zoom (value) {
      this.$store.dispatch('setEditorFontSize', this.editorFontSize + value)
    },
    insert (value, {diffRow, diffColumn}) {
      this.editor.insert(value)
      const {row, column} = this.editor.getCursorPosition()
      this.editor.moveCursorTo(row - diffRow, column - diffColumn)
      this.editor.focus()
    },
    toggleStarred () {
      this.$store.dispatch('toggleStarred', this.activeNote.id)
    }
  },
  watch: {
    editorFontSize (value) {
      this.editor.setFontSize(this.editorFontSize)
      this.editor.resize()
    }
  },
  destroyed () {
    this.editor.destroy()
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
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header {
  height: 40px;
}
.footer {
  height: 20px;
}
</style>
