export const SizeMixin = {
  data: () => ({
    scrollable: {}
  }),
  methods: {
    computeHeight () {
      // console.info(`compute height for component ${this.name}`)
      const sizes = this.elements.map(id => document.querySelector(`#${id}`).clientHeight)
      const sum = sizes.reduce((sum, size) => { return sum + size }, 0)
      const height = window.innerHeight - sum - 40
      this.scrollable = {
        height: `${height}px`,
        'overflow-y': 'auto'
      }
    }
  },
  created () {
    window.addEventListener('resize', this.computeHeight)
  },
  mounted () {
    this.computeHeight()
  },
  destroyed () {
    window.removeEventListener('resize', this.computeHeight)
  }
}
