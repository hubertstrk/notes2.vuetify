<template>
  <div class="component">
    <transition-group name="list-complete" tag="div">
      <div class="item list-complete-item" v-for="(notification, i) in all" :key="i" :style="itemStyle(notification.severity)">
        <v-icon class="severity-icon" color="white">{{notification.icon}}</v-icon>
        <div class="text body-1">{{notification.text}}</div>
        <v-btn class="remove-icon" icon small @click="remove(notification.id)">
          <v-icon color="white" small>clear</v-icon>
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
          return 'background-color: #FF5252;'
        case 'info':
          return 'background-color: #039BE5;'
        case 'warning':
          return 'background-color: #FFD740;'
        case 'success':
          return 'background-color: #60db8f;'
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

.list-complete-item {
  transition: all .5s;
  /* display: inline-block; */
  /* margin-right: 10px; */
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  /* opacity: 0; */
  transform: translateX(400px);
}
.list-complete-leave-active {
  position: absolute;
}

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
  color: white;
  font-weight: bold;
}

.item > * {
  padding: 6px;
}

.icon:hover { cursor: pointer; }
</style>

