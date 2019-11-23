<template>
  <div class="home">
    <Meter v-model="value"/>
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
      value: 4,
    };
  },
};
</script>

<style scoped>
.home {
  margin-top: 10px;
}
</style>
