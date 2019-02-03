<template>
  <div class="drawer">
    <v-list two-line subheader>
      <v-subheader>Settings</v-subheader>
      <DrawerItem route="/new-project" icon="cloud_upload" title="Create Projects" subtitle="Create new projects to organize your notes"/>
      <DrawerItem route="/import-projects" icon="sync" title="Import Projects" subtitle="Import existing projects"/>
      <DrawerItem route="/delete-projects" icon="delete" title="Delete Projects" subtitle="Delete a project and all containing notes"/>
      <DrawerItem route="/appearance" icon="color_lens" title="Appearance" subtitle="Change your theme settings"/>
      <DrawerItem route="/about" icon="info" title="About" subtitle="About"/>
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