<template>
  <div class="component">
    <transition-group name="list" tag="div">
      <div class="item" v-for="{id, text, severity, icon} in all" :key="id" :style="itemStyle(severity)">
        <v-icon class="severity-icon" :color="iconColor(severity)">{{icon}}</v-icon>
        <div class="text body-1">{{text}}</div>
        <v-btn class="remove-icon" icon small @click="remove(id)">
          <v-icon color="#455A64" small>clear</v-icon>
        </v-btn>
      </div>
    </transition-group>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
  computed: {
    ...mapState('notifications', {
      all: state => state.all
    })
  },
  methods: {
    ...mapMutations('notifications', [
      'remove'
    ]),
    itemStyle (severity) {
      switch (severity) {
        case 'error':
          return 'background-color: #FFEBEE;'
        case 'info':
          return 'background-color: #B3E5FC;'
        case 'warning':
          return 'background-color: #FFFF8D;'
        case 'success':
          return 'background-color: #B9F6CA;'
      }
    },
    iconColor (severity) {
      switch (severity) {
        case 'error':
          return 'red darken'
        case 'info':
          return 'blue darken'
        case 'warning':
          return 'yellow darken-3'
        case 'success':
          return 'green darken-3'
      }
    }
  }
}
</script>

<style lang="css" scoped>
.severity-icon, .remove-icon, .text, .item, .container { display: flex; }
.severity-icon, .text { align-self: center; }

.component {
  flex-direction: column;
  width: 280px;
  min-width: 280px;
  max-width: 280px;
  right: 30px;
  bottom: 30px;
  position: fixed;
  z-index: 1000;
  color: #455A64;
}

.item {
  padding: 6px;
  margin-bottom: 8px;
  border-radius: 3px;
}

.text {
  width: 100%;
}

.item > * {
  padding: 6px;
}

.icon:hover { cursor: pointer; }

.list-enter-active, .list-leave-active {
  transition: all 0.6s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateX(200px);
  /* transform: scale(0, 0); */
}
</style>

