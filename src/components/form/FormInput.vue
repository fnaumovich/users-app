<template>
  <section>
    <label :for="id" class="col-sm-2">{{ label }}
      <span class="required-field" v-if="required">*</span>
    </label>
    <input
      class="form-control"
      :class="inputClasses"
      :type="type"
      :readonly="readonly"
      :id="id"
      :placeholder="placeholder"
      :value="value"
      v-model="inputValue"
      @input="onInput"
      @change="onChange"
      @blur="onBlur"
    >
    <div class="invalid-feedback" v-if="isRequiredError">
      <slot name="requiredError"></slot>
    </div>
    <div class="invalid-feedback" v-if="isValidationError">
      <slot name="validationError"></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FormInput',
  data() {
    return {
      inputValue: '',
    };
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    isError: Boolean,
    isValid: Boolean,
    value: [ String, Number ],
    placeholder: String,
    readonly: String,
    required: Boolean,
    isRequiredError: Boolean,
    isValidationError: Boolean,
  },
  computed: {
    inputClasses() {
      return {
        'is-invalid': this.isError,
        'is-valid': this.isValid,
      }
    }
  },
  methods: {
    onInput(value) {
      this.$emit('input', value);
    },
    onChange(value) {
      this.$emit('change', value);
    },
    onBlur(value) {
      this.$emit('blur', value);
    },
  }
};
</script>