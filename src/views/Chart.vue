<template>
<div class="chart">
  <highcharts ref="chart" :options="chartData" v-resize="handleResize"></highcharts>
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
          height: window.innerHeight - 50,
          backgroundColor: 'transparent',
        },
        title: {
          text: '',
        },
        tooltip: {
          borderColor: Highcharts.Color('#424242')
            .setOpacity(0.1)
            .get('rgba'),
          borderRadius: 20,
        },
        xAxis: {
          type: 'datetime',
          breaks: this.breaks,
          tickInterval: 60000,
          lineWidth: 0,
          minorTickLength: 0,
          tickLength: 0,
        },
        yAxis: {
          visible: true,
          lineWidth: 0,
          title: '',
          min: 0,
          max: 10,
          allowDecimals: false,
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
                [0, Highcharts.Color('#F00')
                  .setOpacity(1)
                  .get('rgba')],
                [0.6, Highcharts.Color('#FFA500')
                  .setOpacity(1)
                  .get('rgba')],
                [0.7, Highcharts.Color('#FF0')
                  .setOpacity(1)
                  .get('rgba')],
                [1, Highcharts.Color('#0F0')
                  .setOpacity(1)
                  .get('rgba')],
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
            color: '#424242',
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
      return [];
    },
  },
  methods: {
    track() {
      this.$store.commit('track', { intensity: this.value });
    },
    handleResize() {
      this.$refs.chart.chart.redraw();
    },
  },
};
</script>

<style>
.highcharts-credits {
  display: none;
}
</style>
