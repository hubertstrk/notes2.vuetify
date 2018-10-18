<template>
  <div :style="scrollable" id="iframe-container" class="editor-markup">
  </div>
</template>

<script>
import {SizeMixin} from './SizeMixin.js'
export default {
  props: ['elements'],
  data () {
    return {
      iFrameRef: null
    }
  },
  mixins: [SizeMixin],
  computed: {
    compiledMarkdown () {
      if (!this.$store.state.editor.active) return ''
      return this.$store.state.editor.active.markdown
    }
  },
  methods: {
    addMarkup (markup) {
      // create markdown container
      const container = document.createElement('div')
      container.innerHTML = markup
      // add class to all code elements
      const codeElements = container.querySelectorAll('pre code')
      codeElements.forEach((codeEl) => {
        codeEl.classList.add(`${this.$store.state.editor.settings.codeTheme}-hljs`)
      })
      const iFrame = document.querySelector('#iframe')
      iFrame.contentDocument.body.innerHTML = container.innerHTML
      iFrame.onload = function () {
        iFrame.contentDocument.body.innerHTML = container.innerHTML
      }
    },
    createIFrame () {
      const ifrm = document.createElement('iframe')
      ifrm.setAttribute('id', 'iframe')
      ifrm.classList.add('iframe')
      ifrm.setAttribute('src', '/static/page/index.html')
      ifrm.setAttribute('frameborder', 0)
      ifrm.setAttribute('border', 0)
      ifrm.setAttribute('height', '100%')
      ifrm.setAttribute('width', '100%')
      this.iFrameRef = ifrm
      const el = document.querySelector('#iframe-container')
      el.appendChild(ifrm, el)
    }
  },
  watch: {
    compiledMarkdown (markdown) {
      this.addMarkup(markdown)
    }
  },
  mounted () {
    this.createIFrame()
    if (this.$store.state.editor.active) {
      this.addMarkup(this.$store.state.editor.active.markdown)
    }
  }
}
</script>

<style lang="css" scoped>
.editor-markup {
  min-width: 200px; 
  flex: 2;
  overflow: hidden !important;
}
</style>
