const touchMap = new WeakMap();

const ValidationDelay = {
  methods: {
    validationDelay($v, delay = 1000) {
      $v.$reset();
      if (touchMap.has($v)) {
        clearTimeout(touchMap.get($v));
      }
      touchMap.set($v, setTimeout($v.$touch, delay));
    },
  },
};

export default ValidationDelay;
