import '@testing-library/jest-dom/extend-expect';

// matchMedia polyfill
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
};
