import {marked, clearHeadings, getHeadings} from '@js/marked-config'

class Note {
  constructor (id, project) {
    this.id = id
    this.project = project
    this.text = String
    this.markdown = String
    this.headings = Array
    this.starred = false
  }
  setText (text) {
    this.text = text
    this.compileMarkdown()
  }
  setStarred (starred) {
    this.starred = starred
  }

  compileMarkdown () {
    clearHeadings()

    this.markdown = marked(this.text, { sanitize: true })
    this.headings = getHeadings()
    if (this.headings.length === 0) {
      this.headings.push({text: this.text.substring(0, 20), level: 1})
    }
  }

  equals (toCompare) {
    return toCompare.id === this.id
  }
}

export default Note
