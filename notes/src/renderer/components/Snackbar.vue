<template>
  <div ref="snackbar" id="snackbar">
    <div class="content">
      <v-icon class="icon white--text">{{icon}}</v-icon>
      <div class="message">{{notification.message}}</div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  data () {
    return {
      snackbar: null
    }
  },
  computed: {
    ...mapState('editor', {
      notification: state => state.notification,
      severity: state => state.notification.severity,
      display: state => state.notification.display
    }),
    icon () {
      if (this.severity === 'error') return 'error'
      if (this.severity === 'info') return 'info'
      if (this.severity === 'success') return 'cloud_done'
    }
  },
  watch: {
    display (value) {
      if (value) {
        this.snackbar.classList.add('show')
        // this.snackbar.classList.add(this.severity)
        setTimeout(() => {
          // this.snackbar.classList.remove('show')
          // this.$store.commit('hideNotification')
        }, 3000)
      } else {
        this.snackbar.classList.remove('show')
      }
    }
  },
  mounted () {
    this.snackbar = this.$refs.snackbar
  }
}
</script>

<style lang="css" scoped>
#snackbar {
  visibility: hidden; /* Hidden by default. Visible on click */
  min-width: 250px; /* Set a default minimum width */
  min-width: 250px; /* Set a default minimum width */
  margin-left: -125px; /* Divide value of min-width by 2 */
  color: #fff; /* White text color */
  text-align: center; /* Centered text */
  border-radius: 4px; /* Rounded borders */
  padding: 16px; /* Padding */
  position: fixed; /* Sit on top of the screen */
  z-index: 1; /* Add a z-index if needed */
  left: 50%; /* Center the snackbar */
  bottom: 30px; /* 30px from the bottom */
}

/* Show the snackbar when clicking on a button (class added with JavaScript) */
#snackbar.show {
  visibility: visible; /* Show the snackbar */
  /* Add animation: Take 0.5 seconds to fade in and out the snackbar. 
  However, delay the fade out process for 2.5 seconds */
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

/* Animations to fade the snackbar in and out */
@keyframes fadein {
    from {bottom: 0; opacity: 0;}
    to {bottom: 30px; opacity: 1;}
}

@keyframes fadeout {
    from {bottom: 30px; opacity: 1;}
    to {bottom: 0; opacity: 0;}
}
.content {
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
}

.error {
  background-color: #F44336;
}
.success {
  background-color: #4CAF50;
}
.info {
  background-color: #03A9F4;
}
</style>
