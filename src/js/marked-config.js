import hljs from 'highlight.js'
export const marked = require('marked')

var renderer = new marked.Renderer()

let headings = []
export const clearHeadings = () => {
  headings = []
}
export const getHeadings = () => {
  return headings
}

let codeTags = []
export const clearCodeTags = () => {
  codeTags = []
}
export const getCodeTags = () => {
  return codeTags
}

renderer.heading = function (text, level) {
  const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-')
  headings.push({text, level})
  return `
    <h${level} id="${escapedText}">
      ${text}
    </h${level}>`
}

export const setCodeTheme = (codeStyle) => {
  marked.setOptions({
    highlight: function (code, lang) {
      codeTags.push(lang)
      hljs.configure({
        classPrefix: `${codeStyle}-hljs-`
      })
      if (!lang) {
        return hljs.highlightAuto(code).value
      }
      return hljs.highlight(lang, code).value
    }
  })
}

marked.setOptions({
  renderer,
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})
