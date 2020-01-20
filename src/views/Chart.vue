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
          // eslint-disable-next-line func-names
          formatter: function () {
            return `<b>${this.point.y}</b>, ${formatDistanceToNow(this.point.t, { locale: de, addSuffix: true })}`;
          },
        },
        xAxis: {
          lineWidth: 0,
          minorTickLength: 0,
          tickLength: 0,
          visible: false,
        },
        yAxis: {
          visible: false,
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
            threshold: null,
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
