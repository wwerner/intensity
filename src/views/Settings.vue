<template>
  <div class="settings">
    <v-btn-toggle
      style="width: 100%" block class="ma-1" dense
      mandatory
      v-model="fine"
    >
      <v-btn color="secondary" :value="true" style="width: 50%" outlined>
        <v-icon color="secondary" left class="ml-1">mdi-reorder-horizontal</v-icon>
        <span style="width: 100%">1.1 -> 1.2</span>
      </v-btn>
      <v-btn color="secondary" :value="false" style="width: 50%" outlined>
        <span style="width: 100%">1 -> 2</span>
        <v-icon color="secondary" right class="mr-1">mdi-menu</v-icon>
      </v-btn>
    </v-btn-toggle>

    <v-btn-toggle
      style="width: 100%" block class="ma-1" dense
      mandatory
      v-model="buttons"
    >
      <v-btn color="secondary" :value="true" style="width: 50%" outlined>
        <v-icon color="secondary" left class="ml-1">mdi-unfold-more-horizontal</v-icon>
        <span style="width: 100%">Buttons an</span>
      </v-btn>
      <v-btn color="secondary" :value="false" style="width: 50%" outlined>
        <span style="width: 100%">Buttons aus</span>
        <v-icon color="secondary" right class="mr-1">mdi-unfold-more-horizontal</v-icon>
      </v-btn>
    </v-btn-toggle>

    <v-btn class="ma-1 mb-2" block
           color="warning" outlined
           @click="$store.commit('deleteHistory')"
    >
      <v-icon left>mdi-delete</v-icon>
      <span style="width: 100%">Verlauf löschen</span>
    </v-btn>
    <v-btn class="ma-1 mb-2" block color="secondary" outlined
           :disabled="!$store.state.needsUpdate"
           @click="$store.dispatch('update')"
    >
      <v-icon left>mdi-cellphone-arrow-down</v-icon>
      <span style="width: 100%">Update installieren</span>
    </v-btn>
  </div>
</template>

<script>
export default {
  computed: {
    fine: {
      get() { return this.$store.state.settings.stepSize < 1; },
      set(newVal) {
        if (newVal) {
          this.$store.commit('setStepSize', 0.1);
        } else {
          this.$store.commit('setStepSize', 1);
        }
      },
    },
    buttons: {
      get() { return this.$store.state.settings.stepButtons; },
      set(newVal) {
        if (newVal) {
          this.$store.commit('enableStepButtons');
        } else {
          this.$store.commit('disableStepButtons');
        }
      },
    },
  },
  methods: {
  },
};
</script>
