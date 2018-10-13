<template>
  <div>
    <div class="headline">Create Project</div>
    <div class="subheading">Create a new project.</div>
    <div style="margin-bottom: 20px;">
      <v-btn @click.prevent.stop="$router.push('/new-project')" color="info">Create Project<v-icon right dark>sync</v-icon></v-btn>
    </div>

    <div class="headline">Import Projects</div>
    <div class="subheading">Import Projects</div>
    <div style="margin-bottom: 20px;">
      <v-btn @click.prevent.stop="$router.push('/import-projects')" color="info">Import Projects<v-icon right dark>sync</v-icon></v-btn>
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