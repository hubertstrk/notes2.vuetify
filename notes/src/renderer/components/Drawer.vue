<template>
  <div class="drawer">
    <v-list two-line subheader>
      <v-subheader>Settings</v-subheader>
      <DrawerItem route="/new-project" icon="cloud_done" title="Create Projects" subtitle="Create new projects to organize your notes"/>
      <DrawerItem route="/import-projects" icon="cloud_download" title="Import Projects" subtitle="Import existing projects"/>
      <DrawerItem route="/appearance" icon="color_lens" title="Appearance" subtitle="Change your theme settings"/>
      
    </v-list>
  </div>
</template>

<script>
import DrawerItem from './DrawerItem'

export default {
  components: {
    DrawerItem
  }
}
</script>

<style lang="css" scoped>
.drawer {
  padding: 0px;
}
.drawer > * {
  margin-bottom: 20px;
}
</style>