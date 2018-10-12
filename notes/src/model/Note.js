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
    if (this.headings.length === 0) {
      this.headings.push(this.text.substring(0, 20))
    }
  }

  equals (toCompare) {
    return toCompare.id === this.id
  }
}

export default Note
