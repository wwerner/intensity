<template>
<div id="meter-container" v-resize="handleResize">
  <v-row v-if="portrait">
    <v-col cols="2"></v-col>
    <v-col cols="4">
      <div id="meter">
        <v-slider
          vertical
          min="0"
          max="10"
          :step="stepSize"
          v-model="internalValue"
          v-on:touchstart.native="convertToMousedown"
          @change="$emit('input', internalValue)"
        >
        </v-slider>
      </div>
    </v-col>
    <v-col cols="5">
      <div id="meter-caption" v-if="caption" :style="{color: valueColor, textAlign: 'right'}">
        {{ internalValue }}
      </div>
    </v-col>
  </v-row>
  <v-row v-if="landscape">
    <v-col>
      <div id="meter-caption" v-if="caption" :style="{color: valueColor, textAlign: 'left'}">
        {{ internalValue }}
      </div>
    </v-col>
  </v-row>
  <v-row v-if="landscape">
    <v-col>
      <div id="meter">
        <v-slider
          min="0"
          max="10"
          :step="stepSize"
          v-model="internalValue"
          v-on:touchstart.native="convertToMousedown"
          @change="$emit('input', internalValue)"
        >
        </v-slider>
      </div>
    </v-col>
  </v-row>
</div>
</template>

<script>

export default {
  name: 'Meter',
  data() {
    return {
      internalValue: 0,
      // eslint-disable-next-line no-restricted-globals
      landscape: screen.width > screen.height,
    };
  },
  props: {
    stepSize: {
      type: Number,
      default: 0.1,
    },
    value: {
      type: Number,
    },
    caption: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  computed: {
    portrait() {
      return !this.landscape;
    },
  },
  methods: {
    handleResize() {
      // eslint-disable-next-line no-restricted-globals
      this.landscape = screen.width > screen.height;
    },
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
  margin: auto;
}

#meter-caption {
  font-family: "Roboto", sans-serif;
  font-size: 4em;
  font-weight: bold;
  margin-top: -0.25em;
  margin-left: 0.25em;
}

#meter .v-slider--vertical {
  height: 82vh;
  background: linear-gradient(to top, green, yellow 35%, red 75%);
}

#meter .v-slider--horizontal {
  margin-left: 1.25em;
  margin-right: 1.25em;
  height: 100px;
  background: linear-gradient(to right, green, yellow 35%, red 75%);
}

#meter .v-slider--vertical .v-slider__track-container {
  width: 100px !important;
}

#meter
.v-slider .v-slider__track-container .primary {
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
  transform: scale(1.1) !important;
  top: 0;
}

@media (orientation: landscape) {
  #meter
  .v-slider__thumb {
    transform: rotate(90deg) translateX(-25px) !important;
  }
}
</style>
