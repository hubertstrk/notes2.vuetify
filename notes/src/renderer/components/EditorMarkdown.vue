<template>
  <div class="editor-text">
    <!-- <div  class="link-list">
      <v-btn small depressed dark round>
        <v-icon>format_bold</v-icon>
      </v-btn>
      <v-btn small depressed dark round>
        <v-icon>format_italic</v-icon>
      </v-btn>
      <v-btn small depressed dark round>
        <v-icon>format_strikethrough</v-icon>
      </v-btn>
      <v-btn small depressed dark round>
        <v-icon>link</v-icon>
      </v-btn>
      <v-btn small depressed dark round>
        <v-icon>code</v-icon>
      </v-btn>
      <v-btn small depressed dark round>
        <v-icon>grid_on</v-icon>
      </v-btn> -->
      <!-- <a small @click="insertMetachars('**','**');"><v-icon>format_bold</v-icon></a>
      <a small @click="insertMetachars('*','*');"><v-icon>format_italic</v-icon></a>
      <a small @click="insertMetachars('~~','~~');"><v-icon>format_strikethrough</v-icon></a>
      <a small @click="insertMetachars('','[Google](www.google.com)');"><v-icon>link</v-icon></a>
      <a small @click="insertMetachars('```js\n','```');"><v-icon>code</v-icon></a>
      <a small @click="insertMetachars('Tables | Are | Cool\n--- | --- | ---\n*Still* | `renders` | **nicely**\n1 | 2 | 3\n','');"><v-icon>grid_on</v-icon></a> -->
    <!-- </div> -->
    <div :style="scrollable">
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
      name: 'editor-markdown',
      toggle_multiple: [0, 1, 2, 3, 4, 5]
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
}
</style>
