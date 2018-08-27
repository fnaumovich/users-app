<template>
  <div class="form-group" :class="{ 'form-check': isCheckbox }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FormGroup',
  props: {
    isCheckbox: Boolean,
  },
};
</script>
