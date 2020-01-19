<template>
  <div class="home">
    <Meter
      v-model="value"
      @input="track"
      :step-size="$store.state.settings.stepSize"
    />

    <v-btn class="mx-2 up-button" outlined small color="error"
      v-if="$store.state.settings.stepButtons"
      @click="stepPlus()"
    >
      <v-icon large dark>mdi-chevron-up</v-icon>
    </v-btn>
    <v-btn class="mx-2 down-button" outlined small color="success"
     v-if="$store.state.settings.stepButtons"
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
    },
    stepMinus() {
      this.value = this.value - this.$store.state.settings.stepSize;
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
  }

  .down-button {
    position: absolute;
    min-height: 52px;
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
  }

</style>
