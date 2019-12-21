<template>
  <div class="settings">
    <v-btn class="ma-1" block @click="toggleStepSize" color="secondary" outlined>
      <v-icon left>mdi-plus-one</v-icon>
      <span style="width: 100%">{{ stepToggleMessage }}</span>
    </v-btn>
    <v-btn class="ma-1" block
           color="warning" outlined
           @click="$store.commit('deleteHistory')"
    >
      <v-icon left>mdi-delete</v-icon>
      <span style="width: 100%">Verlauf löschen</span>
    </v-btn>
    <v-btn class="ma-1" block color="secondary" outlined
           :disabled="!$store.state.needsUpdate"
           @click="$store.dispatch('update')"
    >
      <v-icon left>mdi-cellphone-arrow-down</v-icon>
      <span style="width: 100%" v-if="$store.state.needsUpdate">
        Neueste Version installieren
      </span>
      <span style="width: 100%" v-else>Aktuellste Version ist installiert</span>
    </v-btn>
  </div>
</template>

<script>
export default {
  computed: {
    fine() {
      return this.$store.state.settings.stepSize < 1;
    },
    stepToggleMessage() {
      return this.fine
        ? '1 -> 2 -> 3 -> ... -> 9 -> 10'
        : '1 -> 1.1 -> 1.2 -> ... -> 9.9 -> 10';
    },
  },
  methods: {
    toggleStepSize() {
      if (this.fine) {
        this.$store.commit('setStepSize', 1);
      } else {
        this.$store.commit('setStepSize', 0.1);
      }
    },
  },
};
</script>
