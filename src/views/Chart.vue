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

Highcharts.setOptions({
  lang: {
    decimalPoint: ',',
    thousandsSep: '.',
    loading: 'Daten werden geladen...',
    months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
    weekdays: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
    shortMonths: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    exportButtonTitle: 'Exportieren',
    printButtonTitle: 'Drucken',
    rangeSelectorFrom: 'Von',
    rangeSelectorTo: 'Bis',
    rangeSelectorZoom: 'Zeitraum',
    downloadPNG: 'Download als PNG-Bild',
    downloadJPEG: 'Download als JPEG-Bild',
    downloadPDF: 'Download als PDF-Dokument',
    downloadSVG: 'Download als SVG-Bild',
    resetZoom: 'Zoom zurücksetzen',
    resetZoomTitle: 'Zoom zurücksetzen',
  },
});

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
          text: '',
        },
        xAxis: {
          type: 'datetime',
          breaks: this.breaks,
          tickInterval: 60000,
          lineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: 'transparent',
          minorTickLength: 0,
          tickLength: 0,
        },
        yAxis: {
          visible: false,
        },
        legend: {
          enabled: false,
        },
        plotOptions: {
          areaspline: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1,
              },
              stops: [
                [0, Highcharts.Color('#F00').setOpacity(1).get('rgba')],
                [0.6, Highcharts.Color('#FFA500').setOpacity(1).get('rgba')],
                [0.7, Highcharts.Color('#FF0').setOpacity(1).get('rgba')],
                [1, Highcharts.Color('#0F0').setOpacity(1).get('rgba')],
              ],
            },
            marker: {
              radius: 2,
              fillColor: '#424242',
            },
            lineWidth: 0,
            lineColor: 'transparent',
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
            name: '',
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
