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
      example: {
        datasets: [
          {
            data: [
              { y: 1.1, t: 1575629737440 },
              { y: 1.6, t: 1575629740334 },
              { y: 9.3, t: 1575629741698 },
              { y: 1.8, t: 1575629743129 },
              { y: 6.2, t: 1575629744057 },
            ],
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          xAxes: [{
            type: 'time',
            time: {
            },
          }],
        },
      },
    };
  },
  computed: {
    values() {
      return this.$store.state.intensities.map(e => e.intensity);
    },
    dataset() {
      return {
        datasets: [{
          label: 'Intensity',
          fill: true,
          data: this.$store.state.intensities.map(e => (
            {
              y: e.intensity,
              t: new Date(e.timestamp),
            })),
        }],
      };
    },
    styles() {
      return {
        height: '50px',
        position: 'relative',
      };
    },
  },
  methods: {
    track() {
      this.$store.commit('track', { intensity: this.value });
    },
  },
  created() {
    this.value = this.$store.getters.latestIntensity.intensity || 1;
  },
};
</script>
