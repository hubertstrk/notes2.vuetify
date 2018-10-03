import {marked, clearHeadings, getHeadings} from '../js/marked-config'

class Note {
  constructor (id, location) {
    this.id = id
    this.location = location
    this.text = String
    this.markdown = String
    this.headings = Array
  }
  setText (text) {
    this.text = text
    this.compileMarkdown()
  }

  compileMarkdown () {
    clearHeadings()
    this.markdown = marked(this.text, { sanitize: true })
    this.headings = getHeadings()
  }

  equals (toCompare) {
    return toCompare.id === this.id
  }
}

export default Note
