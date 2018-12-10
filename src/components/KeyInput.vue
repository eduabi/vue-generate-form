<template>
  <div class="form-group">
    <label for>{{ label }}</label>
    <input
      :type="inputType"
      class="form-control"
      :id="id"
      :placeholder="placeHolder"
      v-model="inlineVal"
      @keyup.stop="onInputChange"
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
    fieldToUpdate: {
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
    onInputChange() {
      this.$emit('callback', this.fieldToUpdate, this.inlineVal);
    },
  },
  created() {
    this.inlineVal = this.fieldValue;
  },
};
</script>

<style></style>
