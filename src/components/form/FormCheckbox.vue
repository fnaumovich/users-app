<template>
  <section>
    <input
      type="checkbox"
      class="form-check-input"
      :id="id"
      v-model="isChecked"
      @change="onChange($event.target.checked)"
    />
    <label class="form-check-label" :for="id">
      <slot></slot>
    </label>
  </section>
</template>

<script>
export default {
  name: 'FormCheckbox',
  props: {
    id: {
      type: String,
      required: true,
    },
    value: Boolean,
    disabled: Boolean,
  },
  data() {
    return {
      isChecked: this.value,
    };
  },
  methods: {
    onChange(value) {
      this.$emit('change', value);
    },
  },
  watch: {
    value(newVal) {
      this.isChecked = newVal;
    },
  },
};
</script>
