<template>
<v-app id="app" style="width: 100%">
  <v-container>
    <v-row class="child-flex">
      <v-col cols="12">
        <transition
          name="fade"
          mode="out-in"
        >
          <router-view/>
        </transition>
        <v-speed-dial
          v-model="menu"
          bottom absolute right fixed
          direction="top"
          transition="slide-y-reverse-transition"
        >
          <template v-slot:activator>
          <v-btn
            color="primary"
            dark
            fab
            aria-label="Menü"
          >
            <v-icon v-if="menu">mdi-close</v-icon>
            <v-icon v-else>mdi-menu</v-icon>
          </v-btn>
          </template>
          <v-btn
            fab
            dark
            small
            color="green"
            to="/chart"
            aria-label="Auswertung"
          >
            <v-icon>mdi-chart-bell-curve</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            small
            color="yellow darken-2"
            to="/about"
            aria-label="Über"
          >
            <v-icon>mdi-information-outline</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            small
            color="orange"
            to="/settings"
            aria-label="Einstellungen"
          >
            <v-icon>mdi-settings</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            small
            color="red"
            to="/"
            aria-label="Intensität"
          >
            <v-icon>mdi-thermometer</v-icon>
          </v-btn>
        </v-speed-dial>
        <v-snackbar v-model="updateNotification" top color="primary" :timeout="0">
          <v-icon dark>mdi-cellphone-arrow-down</v-icon>
          Update verfügbar. Aktualisieren?
          <v-spacer></v-spacer>
          <v-btn success icon
            @click="$store.dispatch('update')">
            <v-icon>mdi-check-circle</v-icon>
          </v-btn>
          <v-btn success icon
                 @click="updateNotification = false">
            <v-icon>mdi-close-circle</v-icon>
          </v-btn>
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</v-app>
</template>
<script>
export default {
  data() {
    return {
      menu: false,
      updateNotification: this.$store.state.needsUpdate,
    };
  },
  computed: {
    updateAvailable() { return this.$store.state.needsUpdate; },
  },
  watch: {
    updateAvailable: function (updateAvailable) {
      this.updateNotification = !!updateAvailable;
    },
  },
  methods: {},
};
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

</style>
