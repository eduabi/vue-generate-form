<template>
  <li class="form-row">
    <div class="form-group col">
      <label v-if="parentType !== 'array'" for>{{ label }}</label>
      <input
        :type="inputType"
        class="form-control"
        :id="id"
        :placeholder="placeholder"
        v-model="inlineVal"
        @keyup="onInputChange"
      >
    </div>
    <div v-if="parentType === 'array'" class="form-group">
      <button class="btn btn-outline-primary" @click.stop="$emit('removeNode',parseInt(label))">x</button>
    </div>
  </li>
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
    parentType: {
      type: String,
    },
    placeholder: {
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
      this.$emit('callback', this.label, this.inlineVal);
    },
  },
  created() {
    this.inlineVal = this.fieldValue;
  },
};
</script>

<style></style>
