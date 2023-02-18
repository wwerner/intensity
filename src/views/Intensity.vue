<template>
  <div class="home">
    <Meter
      v-model="value"
      @input="track"
      :step-size="$store.state.settings.stepSize"
      :caption="$store.state.settings.displayIntensity"
    />

    <v-btn class="mx-2 up-button neo" small
      v-if="$store.state.settings.stepButtons"
     :disabled="value >= 10"
      @click="stepPlus()"
    >
      <v-icon large dark>mdi-chevron-up</v-icon>
    </v-btn>
    <v-btn class="mx-2 down-button neo" small
     v-if="$store.state.settings.stepButtons"
     :disabled="value <= 0"
     @click="stepMinus()"
    >
      <v-icon large dark>mdi-chevron-down</v-icon>
    </v-btn>
  </div>
</template>

<script>
import Meter from '@/components/Meter.vue';

export default {
  name: 'home',
  components: {
    Meter,
  },
  data() {
    return {
      value: 1,
    };
  },
  methods: {
    track() {
      this.$store.commit('track', {
        subject: 'subject',
        intensity: this.value,
      });
    },
    stepPlus() {
      this.value = this.value + this.$store.state.settings.stepSize;
      this.track();
    },
    stepMinus() {
      this.value = this.value - this.$store.state.settings.stepSize;
      this.track();
    },
  },
  created() {
    this.value = this.$store.getters.latestIntensity.intensity || 1;
  },
};
</script>

<style scoped>
  .home {
    margin-top: 10px;
  }

  .up-button {
    position: absolute;
    min-height: 52px;
    color: var(--v-error-base);
  }

  .down-button {
    position: absolute;
    min-height: 52px;
    color: var(--v-success-base);
  }

  @media (orientation: portrait) {
    .up-button {
      position: absolute;
      left: 16px;
      bottom: 124px;
      min-height: 52px;
      min-width: 52px;
    }

    .down-button {
      position: absolute;
      left: 16px;
      bottom: 56px;
      min-height: 52px;
      min-width: 52px;
    }

    .neo {
    border-radius: 5px;
    background: #f5f5f5;
    box-shadow:  6px 6px 6px #7b7b7b,
                -6px -6px 6px #ffffff !important;
  }

  }

  @media (orientation: landscape) {
    .up-button {
      left: 92px;
      bottom: 10vh;
      transform: rotate(90deg);
    }

    .down-button {
      left: 24px;
      bottom: 10vh;
      transform: rotate(90deg);
  }

      .neo {
    border-radius: 5px;
    background: #f5f5f5;
    box-shadow:  6px -6px 6px #7b7b7b,
                -6px 6px 6px #ffffff !important;
    }
  }
</style>
