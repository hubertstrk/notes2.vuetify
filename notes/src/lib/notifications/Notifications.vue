<template>
  <div class="container">
    <div class="list">
      <transition-group name="list" tag="div">
        <div class="item" v-for="(notification, i) in notifications" :key="i"
          :style="itemStyle(notification.severity)" 
          :class="{'large': notification.subtext, 'small': !notification.subtext}">
          <div class="content">
            <div class="severity">
              <v-icon flat :color="iconColor(notification.severity)">{{iconText(notification.severity)}}</v-icon>
            </div>
            <div class="message">
              <div class="header body-2">
                <div>{{notification.text}}</div>
                <div>
                  <v-btn small icon @click="remove(notification.id)">
                    <v-icon small>clear</v-icon>
                  </v-btn>
                </div>
              </div>
              <div v-if="notification.subtext" class="body caption">{{notification.subtext}}</div>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
  computed: {
    ...mapState('notifications', {
      notifications: state => state.all
    })
  },
  methods: {
    ...mapMutations('notifications', [
      'remove'
    ]),
    severityClass (severity) {
      return `sev-${severity}`
    },
    itemStyle (severity) {
      if (severity === 'error') return 'background-color: #FFEBEE;'
      if (severity === 'info') return 'background-color: #B3E5FC'
      if (severity === 'success') return 'background-color: #B9F6CA;'
      if (severity === 'warning') return 'background-color: #FFFF8D;'
    },
    iconText (severity) {
      if (severity === 'error') return 'error'
      if (severity === 'info') return 'info'
      if (severity === 'success') return 'done'
      if (severity === 'warning') return 'warning'
    },
    iconColor (severity) {
      if (severity === 'error') return 'red darken'
      if (severity === 'info') return 'blue darken'
      if (severity === 'success') return 'green darken-3'
      if (severity === 'warning') return 'yellow darken-3'
    }
  }
}
</script>

<style lang="css" scoped>
.content, .header, .message, .severity, .item, .list {display: flex;}
.message, .list {flex-direction: column;}
.severity  {align-items: center;}

.list-enter-active, .list-leave-active {
  transition: all 0.6s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translatex(230px);
}

.message {
  justify-content: space-around;
}
.header {
  justify-content: space-between;
  align-items: center;
}

.severity {
  width: 40px;
}

.item {
  border-radius: 3px;
  width: 100%;
  margin-bottom: 8px;
  padding: 6px;
  background-color: white;
}

.small {
  height: 45px;
}
.large {
  height: 70px;
}

.sev-error {
  /* border-top: 8px solid #EF5350; */
  background-color: #FFEBEE;
}
.sev-info {
  /* border-top: 8px solid #2196F3; */
  background-color: #E3F2FD;
}
.sev-success {
  /* border-top: 8px solid #00C853; */
  background-color: #DCEDC8;
}
.sev-warning {
  /* border-top: 8px solid #FFFF00; */
  background-color: #FFF9C4;
}
.icon:hover {
  cursor: pointer;
}

.container {
  width: 280px;
  min-width: 280px;
  max-width: 280px;
  right: 15px;
  bottom: 15px;
  position: fixed;
  z-index: 1;
}

/* Show the snackbar when clicking on a button (class added with JavaScript) */
/* #snackbar.show { */
  /* visibility: visible; Show the snackbar */
  /* Add animation: Take 0.5 seconds to fade in and out the snackbar. 
  However, delay the fade out process for 2.5 seconds */
  /* animation: fadein 0.5s, fadeout 0.5s 2.5s;
} */

/* Animations to fade the snackbar in and out */
/* @keyframes fadein {
    from {bottom: 0; opacity: 0;}
    to {bottom: 30px; opacity: 1;}
}

@keyframes fadeout {
    from {bottom: 30px; opacity: 1;}
    to {bottom: 0; opacity: 0;}
} */
/* .content {
  display: flex;
  align-items: center;
}
.icon {
  display: flex;
  flex: 1;
}
.message {
  display: flex;
  flex: 4;
} */
/* .error {
  background-color: #F44336;
}
.success {
  background-color: #4CAF50;
}
.info {
  background-color: #03A9F4;
} */
</style>

