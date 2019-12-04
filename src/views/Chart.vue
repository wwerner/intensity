<template>
  <div class="chart">
    <v-sparkline
      :gradient="['red','yellow', 'green',]"
      :smooth="true"
      :value="values"
      auto-draw
    ></v-sparkline>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 1,
    };
  },
  computed: {
    values() {
      return this.$store.state.intensities.map(e => e.intensity);
    },
  },
  methods: {
    track() {
      this.$store.commit('track', { subject: 'subject', intensity: this.value });
    },
  },
  created() {
    this.value = this.$store.getters.latestIntensity.intensity || 1;
  },
};
</script>
