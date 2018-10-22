<template>
  <div class="editor-markup">
    <div id="markup-toolbar" class="markup-toolbar">
      <v-btn small flat icon @click="print"><v-icon>print</v-icon></v-btn>
    </div>
    <div :style="scrollable" id="iframe-container"></div>
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
      if (!this.active) return ''
      return this.active.markdown
    },
    active () {
      return this.$store.getters.activeNote
    },
    codeTheme () {
      return this.$store.state.editor.settings.codeTheme
    }
  },
  methods: {
    print () {
      document.querySelector('#iframe').contentWindow.print()
    },
    addMarkup (markup) {
      // create markdown container
      const container = document.createElement('div')
      container.innerHTML = markup
      // add class to all code elements
      const codeElements = container.querySelectorAll('pre code')
      codeElements.forEach((codeEl) => {
        codeEl.classList.add(`${this.codeTheme}-hljs`)
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
    if (this.active) {
      this.addMarkup(this.active.markdown)
    }
  }
}
</script>

<style lang="css" scoped>
.editor-markup {
  min-width: 200px; 
  flex: 2;
  flex-direction: column;
  overflow: hidden !important;
}
.markup-toolbar {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 10px 0 0;
}

#iframe-container {
  overflow: hidden !important;
}
</style>
