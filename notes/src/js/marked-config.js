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

renderer.heading = function (text, level) {
  const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-')
  headings.push({text, level})
  return `
    <h${level} id="${escapedText}">
      ${text}
    </h${level}>`
}

marked.setOptions({
  highlight: function (code) {
    return hljs.highlightAuto(code).value
  },
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
