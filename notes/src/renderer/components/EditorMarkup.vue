<template>
  <div id="iframe-container" class="editor-markup">
    <!-- <div class="compiled-markup" v-html="compiledMarkdown"></div>  -->
    <!-- <iFrame src="/static/page/index.html" ref="iframe" class="iframe" frameborder="0" border="0"></iFrame> -->
  </div>
</template>

<script>
export default {
  // props: ['elements'],
  data () {
    return {
    }
  },
  computed: {
    compiledMarkdown () {
      if (!this.$store.state.editor.active) return ''
      return this.$store.state.editor.active.markdown
    },
    markdown () {
      if (!this.$store.state.editor.active || !this.$store.state.editor.active.markdown) return ''
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
      document.querySelector('#iframe').contentDocument.body.innerHTML = container.innerHTML
    }
  },
  watch: {
    compiledMarkdown (markup) {
      this.addMarkup(markup)
    }
  },
  mounted () {
    const ifrm = document.createElement('iframe')
    ifrm.setAttribute('id', 'iframe')
    ifrm.classList.add('iframe')
    ifrm.setAttribute('src', '/static/page/index.html')

    const el = document.querySelector('#iframe-container')
    el.appendChild(ifrm, el)

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
