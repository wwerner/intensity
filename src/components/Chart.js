import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  props: ['dataset', 'options'],
  mounted() {
    console.log(this.dataset);
    this.renderChart(this.dataset, this.options);
  },
};
