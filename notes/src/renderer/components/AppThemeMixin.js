export const AppThemeMixin = {
  data () {
    return {
    }
  },
  computed: {
    appThemeStyle () {
      const style = this.$store.state.editor.settings.appTheme === 'dark' ? 'theme--dark' : 'theme--light'
      console.info(style)
      return style
    }
  }
}
