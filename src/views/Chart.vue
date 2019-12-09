<template>
  <div class="chart">
    <highcharts :options="chartData"></highcharts>

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
import brokenInit from 'highcharts/modules/broken-axis';
import histogramInit from 'highcharts/modules/histogram-bellcurve';

brokenInit(Highcharts);
histogramInit(Highcharts);

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
    chartData() {
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
          tickInterval: 60000,
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

        series: [
          {
            id: 'intensities-1',
            type: 'areaspline',
            name: 'Intensität',
            data: this.dataset,
          },
        ],
      };
    },
    values() {
      return this.$store.state.intensities.map(e => e.intensity);
    },
    dataset() {
      return this.$store.state.intensities.map(e => [e.timestamp, e.intensity]);
    },
    breaks() {
      return [{
        from: 1575821226387,
        to: 1575871075028,
        breakSize: 1000 * 60 * 10,
      }];
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
