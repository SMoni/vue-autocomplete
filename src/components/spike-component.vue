<template>
  <div class="spike-component">
    <input class="input"
      @keydown.enter.prevent="onInput($event.target.value)"
    >
  </div>
</template>

<script>
export default {
  name: 'spike-component',
  props: {
    value: {
      type: Object
    }
  },
  methods: {
    onInput: function(value) {

      const result = {};

      result['name'] = value;

      this.$emit('input', result);
    }
  }
}
</script>

