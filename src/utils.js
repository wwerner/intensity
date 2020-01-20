/* eslint-disable */
export default {
  color: function color(intensity) {
    return `hsl(${120 - Math.round(intensity * 1.1 * 12)}, 100%, 45%)`;
  },
  debounce: function debounce(fn, delay) {
    var timeoutID = null;
    return function () {
      clearTimeout(timeoutID);
      var args = arguments;
      var that = this;
      timeoutID = setTimeout(function () {
        fn.apply(that, args);
      }, delay);
    };
  },
};
