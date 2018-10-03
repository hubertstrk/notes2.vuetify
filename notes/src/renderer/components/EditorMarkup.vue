<template>
  <div class="editor-markup" :style="scrollable">
    <div class="compiled-markup" v-html="compiledMarkdown"></div> 
  </div>
</template>

<script>
import {SizeMixin} from './SizeMixin.js'

export default {
  name: 'editor-markup',
  props: ['elements'],
  mixins: [SizeMixin],
  data () {
    return {
      name: 'editor-markup'
    }
  },
  computed: {
    compiledMarkdown: function () {
      if (!this.$store.state.editor.active) return ''
      return this.$store.state.editor.active.markdown
    }
  }
}
</script>

<style lang="css" scoped>
.editor-markup {
  min-width: 300px; 
  flex: 2; 
}

.compiled-markup {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  padding: 10px 10px;
}
</style>
