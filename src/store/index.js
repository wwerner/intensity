import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    intensities: [],
    settings: {
      stepSize: 0.1,
      stepButtons: true,
    },
    needsUpdate: false,
    updateWorker: undefined,
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
    enableStepButtons: (state) => {
      state.settings.stepButtons = true;
    },
    disableStepButtons: (state) => {
      state.settings.stepButtons = false;
    },
    deleteHistory: (state) => {
      state.intensities = [];
    },
    updateAvailable: (state, worker) => {
      state.needsUpdate = true;
      state.updateWorker = worker;
    },
    updateInstalled: (state) => {
      state.needsUpdate = false;
    },
  },
  getters: {
    latestIntensity: state => state.intensities[state.intensities.length - 1] || {
      timestamp: Date.now(),
      subject: '',
      intensity: 1,
    },
  },
  actions: {
    update(context) {
      context.commit('updateInstalled');
      if (context.state.updateWorker) {
        context.state.updateWorker.postMessage({ action: 'skipWaiting' });
      }
    },
  },
  modules: {},
  plugins: [createPersistedState({
    key: 'intensity-v3',
    paths: ['intensities', 'settings'],
  })],
});
