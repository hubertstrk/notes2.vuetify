export const AppThemeMixin = {
  data () {
    return {
    }
  },
  computed: {
    appThemeStyle () {
      return this.$store.state.editor.settings.appTheme === 'dark' ? 'theme--dark' : 'theme--light'
    }
  }
}
