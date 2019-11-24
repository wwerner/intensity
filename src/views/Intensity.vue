<template>
  <div class="home">
    <Meter v-model="value" @input="track"/>
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
      this.$store.commit('track', { subject: 'subject', intensity: this.value });
    },
  },
  mounted() {
    this.value = this.$store.getters.latestIntensity.intensity || 1;
  },
};
</script>

<style scoped>
.home {
  margin-top: 10px;
}
</style>
