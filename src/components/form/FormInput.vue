<template>
  <section>
    <label :for="id" class="col-sm-2">{{ label }}
      <span class="required-field" v-if="required">*</span>
    </label>
    <MaskedInput
      class="form-control"
      v-if="mask"
      :mask="mask"
      :class="inputClasses"
      :type="type"
      :readonly="readonly"
      :id="id"
      :placeholder="placeholder"
      :value="value"
      @input="onMaskedInput"
      @change="onChange"
      @blur="onBlur"
    />

    <input
      class="form-control"
      v-else
      :class="inputClasses"
      :type="type"
      :readonly="readonly"
      :id="id"
      :placeholder="placeholder"
      :value="value"
      @input="onInput($event.target.value)"
      @change="onChange($event.target.value)"
      @blur="onBlur"
    />
    <div class="invalid-feedback" v-if="isRequiredError">
      <slot name="requiredError"></slot>
    </div>
    <div class="invalid-feedback" v-if="isValidationError">
      <slot name="validationError"></slot>
    </div>
  </section>
</template>

<script>
// import MaskedInput from 'vue-masked-input';
import MaskedInput from "vue-masked-input";
import { capitalizeFirstLowercaseRest } from '@/tools/helpers'
import { isDefined } from "../../tools/helpers";

export default {
  name: 'FormInput',
  components: { MaskedInput },
  data() {
    return {
      inputValue: this.value,
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
    mask: String,
    upperFirst: Boolean,
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
      const decoratedValue = this.decorateValue(value);
      this.$emit('input', decoratedValue);
    },
    onChange(value) {
      const decoratedValue = this.decorateValue(value);
      this.$emit('change', decoratedValue);
    },
    onBlur(value) {
      this.$emit('blur');
    },
    onMaskedInput(value) {
      this.onInput(value);
    },
    decorateValue(value) {
      value = isDefined(value) ? value : '';

      if (this.upperFirst) { value = capitalizeFirstLowercaseRest(value) }

      return value;
    }
  },
  watch: {
    value(newVal) {
      this.inputValue = newVal;
    },
  },
};
</script>

<style>
  .required-field {
    color: red;
  }
</style>
