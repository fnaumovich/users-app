export default {
  setItem(key, value) {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data)
  },

  getItem(key) {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
  }
};
