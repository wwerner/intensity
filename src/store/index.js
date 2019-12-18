import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    version: '1.0.0',
    intensities: [],
    settings: {
      stepSize: 0.1,
    },
  },
  mutations: {
    track: (state, item) => {
      const itemWithTime = item;
      itemWithTime.timestamp = Date.now();
      state.intensities.push(itemWithTime);
    },
    setStepSize: (state, stepSize) => {
      state.settings.stepSize = stepSize;
    },
    deleteHistory: (state) => {
      state.intensities = [];
    },
  },
  getters: {
    latestIntensity: state => state.intensities[state.intensities.length - 1] || {
      timestamp: Date.now(),
      subject: '',
      intensity: 1,
    },
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState({
    key: 'intensity-v2',
  })],
});
