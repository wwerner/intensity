<template>
<div id="meter-container">
  <div id="meter-caption" v-if="caption" :style="{color: valueColor}">{{ internalValue }}</div>
  <v-slider
    vertical
    min="0"
    max="10"
    step="0.1"
    v-model="internalValue"
    @change="$emit('input', internalValue)"
  >
  </v-slider>
</div>
</template>

<script>
export default {
  name: 'Meter',
  data() {
    return {
      internalValue: 0,
    };
  },
  props: {
    value: {
      type: Number,
      required: true,
      default: 4,
    },
    caption: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  methods: {
    valueColor() {
      return 'black';
    },
  },
  mounted() {
    this.internalValue = this.value;
  },
};
</script>

<style scoped>
#meter-container {
  width: 100px;
  margin: auto;
}

#meter-caption {
  font-family: "Roboto", sans-serif;
  text-align: center;
  font-size: 3em;
  font-weight: bold;
}

#meter {
  height: 80vh;
  background: linear-gradient(to top, green, yellow 35%, red 75%);
}

#meter-overlay {
  background-color: lavender;
}
</style>
