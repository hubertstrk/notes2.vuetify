<template>
  <v-list-tile avatar @click="$router.push(route)">
    <v-list-tile-avatar>
      <v-icon color="primary">{{icon}}</v-icon>
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title>{{title}}</v-list-tile-title>
      <v-list-tile-sub-title>{{subtitle}}</v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
export default {
  props: ['route', 'icon', 'title', 'subtitle']
}
</script>

<style lang="css" scoped>
</style>
