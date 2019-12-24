export default {
  color: function color(intensity) {
    return `hsl(${120 - Math.round(intensity * 1.1 * 12)}, 100%, 45%)`;
  },
};
