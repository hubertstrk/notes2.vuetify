<template>
  <v-layout row wrap justify-center id="wrapper">
    <EditorMarkdown v-if="readMode" :elements="['app-tool-bar', 'editor-toolbar', 'editor-footer']" />
    <EditorMarkup :elements="['app-tool-bar', 'markup-toolbar']" />
  </v-layout>
</template>

<script>
import EditorMarkup from './EditorMarkup'
import EditorMarkdown from './EditorMarkdown'

export default {
  name: 'Editor',
  components: {EditorMarkup, EditorMarkdown},
  data () {
    return {
      expanded: false
    }
  },
  computed: {
    readMode () {
      return this.$store.state.editor.settings.readMode
    }
  },
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
