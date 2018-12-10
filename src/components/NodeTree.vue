<template>
  <li class="node-tree">
    <div v-if="!hasChildren">
      <key-input
        :id="path"
        :label="path"
        :fieldToUpdate="path"
        :placeHolder="`Type ${item.name.toLowerCase()} here...`"
        type="text"
        @callback="updateValue"
      />
    </div>
    <!-- <pre v-if="item.children && item.children.length"
    class="pre">{{pre(item.children)}}</pre>-->
    <ul v-else>
      <node
        v-for="(child) in item.children"
        :item="child"
        :key="generatePath(child.name,index)"
        :path="generatePath(child.name,index)"
        :level="level+1"
      ></node>
    </ul>
  </li>
</template>

<script>
import KeyInput from './KeyInput';

export default {
  name: 'node',
  props: ['item', 'level', 'path', 'index'],
  created() {
    this.itemData = this.item.isList ? [] : '';
  },
  data() {
    return {
      itemData: null,
    };
  },
  components: {
    KeyInput,
  },
  computed: {
    hasChildren() {
      return this.item.children && this.item.children.length;
    },
  },
  methods: {
    generatePath(name, i) {
      let path = '';
      if (this.item.isList) {
        path = this.path ? `${this.path}[${i}]` : `${this.item.name}[${i}]`;
        path = name ? `${path}.${name}` : path;
      } else {
        path = this.path ? `${this.path}.${name}` : `${this.item.name}.${name}`;
      }
      return path;
    },
    updateValue(path, value) {
      console.log(path, value);
    },
    pre(o) {
      return JSON.stringify(o, null, 4);
    },
  },
};
</script>

<style>
li {
  list-style-type: none;
}
</style>
