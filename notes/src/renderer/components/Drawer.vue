<template>
  <div class="drawer">
    <DrawerSynchronization />
  </div>
</template>

<script>
  import DrawerSynchronization from './DrawerSynchronization.vue'

  export default {
    components: {
      DrawerSynchronization
    }
  }
</script>

<style lang="css" scoped>
.drawer {
  padding: 20px;  
}
.drawer > * {
  margin-bottom: 20px;
}
</style>