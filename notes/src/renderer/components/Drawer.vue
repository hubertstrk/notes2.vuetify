<template>
  <div class="drawer">
    <v-list two-line subheader>
      <v-subheader>Settings</v-subheader>
      
      <v-list-tile avatar @click="$router.push('/new-project')">
        <v-list-tile-avatar>
          <v-icon>cloud_done</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>Create Projects</v-list-tile-title>
          <v-list-tile-sub-title>Create new projects to organize your notes</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile avatar @click="$router.push('/import-projects')">
        <v-list-tile-avatar>
          <v-icon>cloud_download</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>Import Projects</v-list-tile-title>
          <v-list-tile-sub-title>Import existing projects</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile avatar @click="$router.push('/appearance')">
        <v-list-tile-avatar>
          <v-icon>color_lens</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>Appearance</v-list-tile-title>
          <v-list-tile-sub-title>Change your theme settings</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
  export default {
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