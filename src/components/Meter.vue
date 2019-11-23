<template>
<div id="meter-container">
  <div id="meter-caption" v-if="caption" :style="{color: valueColor}">{{ internalValue }}</div>
  <div id="meter">
    <v-slider
      vertical
      min="0"
      max="10"
      step="0.1"
      v-model="internalValue"
      v-on:touchstart.native="convertToMousedown"
      @change="$emit('input', internalValue)"
    >
    </v-slider>
  </div>
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
  computed: {},
  methods: {
    valueColor() {
      return 'black';
    },
    // we need this to be able to
    // a) activate a range location
    // while b) preventing the touchstart event from initiating a page reload by pulling down
    convertToMousedown(e) {
      const touches = e.changedTouches;
      const first = touches[0];

      const simulatedEvent = document.createEvent('MouseEvent');
      simulatedEvent.initMouseEvent('click', true, true, window, 1,
        first.screenX, first.screenY,
        first.clientX, first.clientY, false,
        false, false, false, 0, null);

      first.target.dispatchEvent(simulatedEvent);
      e.preventDefault();
    },
  },
  mounted() {
    this.internalValue = this.value;
  },
};
</script>

<style>
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

.v-slider--vertical {
  height: 70vh;
  background: linear-gradient(to top, green, yellow 35%, red 75%);
}

#meter .v-slider--vertical .v-slider__track-container {
  width: 100px !important;
}

#meter
.v-slider--vertical .v-slider__track-container .primary {
  background: transparent !important;
  border-color: transparent !important;
}

#meter
.v-slider--vertical .v-slider__track-container .v-slider__track-background {
  /* background: rgba(255,255,255,0.6) !important; */
  background: transparent !important;
  border-color: transparent !important;
}

#meter
.v-slider--vertical .v-slider__track-container .v-slider__track-fill {
  background: transparent !important;
  border-color: transparent !important;
}

#meter
.v-slider__thumb {
  position: absolute;
  width: 120px;
  height: 3em;
  left: -60px;
  top: 50%;
  border-radius: 10px;
  -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

#meter
.v-slider__thumb::before {
  position: absolute;
  width: 120px;
  height: 3em;
  left: 0;
  top: 50%;
  border-radius: 10px;
  -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

#meter
.v-slider__thumb-container--active .v-slider__thumb:before {
  transform: scale(1) !important;
  top: 0;
}
</style>
