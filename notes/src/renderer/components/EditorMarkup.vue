<template>
  <div class="editor-markup">
    <!-- <div class="compiled-markup" v-html="compiledMarkdown"></div>  -->
    <iFrame src="/static/page/index.html" id="iframe" class="iframe" frameborder="0" border="0"></iFrame>
  </div>
</template>

<script>
export default {
  name: 'editor-markup',
  props: ['elements'],
  data () {
    return {
      name: 'editor-markup'
    }
  },
  computed: {
    compiledMarkdown () {
      console.info('compiledMarkdown')
      if (!this.$store.state.editor.active) return ''
      return this.$store.state.editor.active.markdown
    },
    markdown () {
      if (!this.$store.state.editor.active || !this.$store.state.editor.active.markdown) return ''
      return this.$store.state.editor.active.markdown
    }
  },
  watch: {
    compiledMarkdown (markup) {
      document.querySelector('#iframe').contentDocument.body.innerHTML = markup
    }
  }
}
</script>

<style lang="css" scoped>
.editor-markup {
  min-width: 200px; 
  flex: 2;
}

.iframe {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  border-style: none;
}

.compiled-markup {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  padding: 5px 10px
}
</style>
