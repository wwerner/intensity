<template>
  <v-app id="app" style="width: 100%">
    <v-container fluid>
      <v-row class="child-flex">
        <v-col cols="12">
          <router-view/>

          <v-speed-dial
            v-model="menu"
            bottom absolute right
            direction="top"
            transition="slide-y-reverse-transition"
          >
            <template v-slot:activator>
              <v-btn
                color="primary"
                dark
                fab
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
            >
              <v-icon>mdi-chart-bell-curve</v-icon>
            </v-btn>
            <v-btn
              fab
              dark
              small
              color="yellow darken-2"
              to="/about"
            >
              <v-icon>mdi-information-outline</v-icon>
            </v-btn>
            <v-btn
              fab
              dark
              small
              color="orange"
              to="/settings"
            >
              <v-icon>mdi-settings</v-icon>
            </v-btn>
            <v-btn
              fab
              dark
              small
              color="red"
              to="/"
            >
              <v-icon>mdi-thermometer</v-icon>
            </v-btn>
          </v-speed-dial>
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
    };
  },
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

</style>
