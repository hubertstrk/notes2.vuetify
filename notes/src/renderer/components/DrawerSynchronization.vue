<template>
  <div>
    <div class="headline">Synchronization</div>
    <div class="subheading">Manage your storage locations.</div>
    <div style="margin-bottom: 20px;">
      <v-btn @click.prevent.stop="$router.push('/synchronization')" color="info">Synchronization<v-icon right dark>sync</v-icon></v-btn>
    </div>
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang="css" scoped>
.btn {
  margin: 20px 0 !important;
}
.headline {
  margin: 10px 0;
}
</style>