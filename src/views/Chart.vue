<template>
  <div class="chart">
    <highcharts :options="example"></highcharts>

    <v-sparkline
      :gradient="['red','yellow', 'green',]"
      :smooth="true"
      :value="values"
      auto-draw
    ></v-sparkline>
  </div>
</template>

<script>
import { Chart } from 'highcharts-vue';
import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/broken-axis';

exportingInit(Highcharts);
export default {
  components: {
    highcharts: Chart,
  },
  data() {
    return {
      value: 1,
    };
  },
  computed: {
    example() {
      return {
        chart: {
          zoomType: 'x',
        },
        title: {
          text: 'Verlauf',
        },
        xAxis: {
          type: 'datetime',
          breaks: this.breaks,
        },
        yAxis: {
          title: {
            text: 'Intensität',
          },
        },
        legend: {
          enabled: false,
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1,
              },
              stops: [
                [0, Highcharts.getOptions().colors[0]],
                [1, Highcharts.Color(Highcharts.getOptions().colors[0])
                  .setOpacity(0)
                  .get('rgba')],
              ],
            },
            marker: {
              radius: 2,
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1,
              },
            },
            threshold: null,
          },
        },

        series: [{
          type: 'area',
          name: 'Intensität',
          data: this.dataset,
        }],
      };
    },
    values() {
      return this.$store.state.intensities.map(e => e.intensity);
    },
    dataset() {
      return this.$store.state.intensities.map(e => [e.timestamp, e.intensity]);
    },
    breaks() {
      return [
        {
          from: 1575821226390,
          to: 1575871075020,
          breakSize: 3600000,
        },
      ];
    },
  },
  methods: {
    track() {
      this.$store.commit('track', { intensity: this.value });
    },
    created() {
      this.value = this.$store.getters.latestIntensity.intensity || 1;
    },
  },
};
</script>

<style>
  .highcharts-credits {
    display: none;
  }
</style>
