<template>
<div class="chart">
  <highcharts ref="chart" :options="chartData" v-resize="handleResize"></highcharts>
</div>
</template>

<script>
import { Chart } from 'highcharts-vue';
import { formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';
import Highcharts from 'highcharts';
import utils from '../utils';

Highcharts.setOptions({
  lang: {
    decimalPoint: ',',
    thousandsSep: '.',
    loading: 'Daten werden geladen...',
    exportButtonTitle: 'Exportieren',
    printButtonTitle: 'Drucken',
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
          responsive: true,
        },
        title: {
          text: '',
        },
        tooltip: {
          borderColor: Highcharts.Color('#424242')
            .setOpacity(0.1)
            .get('rgba'),
          borderRadius: 20,
          formatter: function () {
            return `<b>${this.point.y}</b>, ${formatDistanceToNow(this.point.t, { locale: de, addSuffix: true })}`;
          },
        },
        xAxis: {
          lineWidth: 1,
          minorTickLength: 0,
          tickLength: 0,
          visible: true,
          labels: {
            enabled: false,
          },
        },
        yAxis: {
          visible: true,
          lineWidth: 0,
          title: '',
          min: this.min,
          max: this.max,
          allowDecimals: false,
        },
        legend: {
          enabled: false,
        },
        plotOptions: {
          column: {
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
            threshold: 0,
          },
        },

        series: [
          {
            id: 'intensities-1',
            type: 'column',
            name: '',
            data: this.dataset,
          },
        ],
      };
    },
    dataset() {
      return this.$store.state.intensities.map(e => ({
        t: e.timestamp,
        y: e.intensity,
        color: utils.color(e.intensity),
      }));
    },
    min() {
      return this.$store.state.settings.scale === 'positive' ? 0 : -10;
    },
    max() {
      return this.$store.state.settings.scale === 'negative' ? 0 : 10;
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
