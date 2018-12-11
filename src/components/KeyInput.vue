<template>
  <div class="form-group">
    <label for>{{ label }}</label>
    <input
      :type="inputType"
      class="form-control"
      :id="id"
      :placeholder="placeHolder"
      v-model="inlineVal"
      @keyup="onInputChange"
    >
  </div>
</template>

<script>
export default {
  name: 'key-input',
  props: {
    id: {
      type: String,
    },
    label: {
      type: String,
      default: 'Field Label',
    },
    inputType: {
      type: String,
      default: 'text',
    },
    fieldValue: {
      type: String,
    },
    path: {
      type: String,
    },
    parent: {
      type: String,
    },
    placeHolder: {
      type: String,
      default: 'Type something here',
    },
    callback: {
      type: Function,
    },
  },
  data() {
    return {
      inlineVal: null,
    };
  },
  methods: {
    onInputChange(e) {
      this.$emit('callback', this.label, this.inlineVal);
    },
  },
  created() {
    this.inlineVal = this.fieldValue;
  },
};
</script>

<style></style>
