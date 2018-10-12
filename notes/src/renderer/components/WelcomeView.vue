<template>
  <v-layout row wrap justify-center id="wrapper">
    <EditorMarkdown :elements="['app-tool-bar']"></EditorMarkdown>
    <EditorMarkup :elements="['app-tool-bar']"></EditorMarkup>
  </v-layout>
</template>

<script>
import EditorMarkup from './EditorMarkup'
import EditorMarkdown from './EditorMarkdown'

export default {
  name: 'welcome',
  components: {EditorMarkup, EditorMarkdown},
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
