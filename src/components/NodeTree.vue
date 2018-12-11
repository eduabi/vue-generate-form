<template>
  <li class="node-tree" v-if="active">
    <div v-if="isNaN(itemKey)">
      {{itemKey}}
      <span v-if="isList">{{activeIndex + 1}}/{{childrens.length}}</span>
    </div>
    <key-input
      v-for="(field,i) in fields"
      :id="field"
      :key="field"
      :label="field"
      :fieldValue="item[field]"
      :path="generatePath(field,i)"
      :fieldToUpdate="field"
      placeholder
      type="text"
      @callback="updateValue"
    />
    <div v-if="isList" class="list-control">
      <button @click="previous" class="btn btn-link">⟵</button>
      <button @click="addNode" class="btn btn-link">Add</button>
      <button @click="removeNode" :disabled="childrens.length < 2" class="btn btn-link">Remove</button>
      <button @click="next" class="btn btn-link">⟶</button>
    </div>
    <ul>
      <node
        v-for="(child,i) in childrens"
        :isList="Array.isArray(item[child])"
        :path="generatePath(child,i)"
        :item="item[child]"
        :itemKey="child"
        :key="i"
        :active="isList ? i === activeIndex : true"
        @addNode="addNode"
        @callback="updateValue"
      ></node>
    </ul>
  </li>
</template>

<script>
import KeyInput from './KeyInput';
import v4 from 'uuid/v4';
import _ from 'lodash';

export default {
  name: 'node',
  props: ['item', 'level', 'path', 'index', 'itemKey', 'active', 'isList'],

  created() {
    this.template = _.cloneDeep(this.item);
  },
  data() {
    return {
      activeIndex: 0,
      template: '',
    };
  },
  components: {
    KeyInput,
  },
  computed: {
    fields() {
      return Object.keys(this.item).filter(k => {
        if (typeof this.item[k] === 'string') return k;
      });
    },

    childrens() {
      return Object.keys(this.item).filter(k => {
        if (typeof this.item[k] !== 'string') return k;
      });
    },
  },
  methods: {
    isActive(child) {
      const k = parseInt(child);
      if (k && !isNaN(k)) {
        return k === this.activeIndex;
      }
      return true;
    },
    getId() {
      return v4().slice(-8);
    },
    generatePath(name, i) {
      let path = '';
      if (Array.isArray(this.item)) {
        path = this.path ? `${this.path}[${i}]` : `${name}[${i}]`;
      } else {
        path = this.path ? `${this.path}.${name}` : `${name}`;
      }
      return path;
    },
    addNode(index) {
      const x = _.cloneDeep(this.template[0]);
      const updatedVal = [...this.item, x];
      this.$emit('callback', this.itemKey, updatedVal);
      this.activeIndex = this.item.length;
    },
    removeNode() {
      if (this.item.length > 1) {
        const updatedVal = [
          ...this.item.slice(0, this.activeIndex),
          ...this.item.slice(this.activeIndex + 1),
        ];
        this.$emit('callback', this.itemKey, updatedVal);
      }
    },
    previous() {
      this.activeIndex =
        (this.activeIndex - 1 + this.childrens.length) % this.childrens.length;
    },
    next() {
      this.activeIndex =
        (this.activeIndex + 1 + this.childrens.length) % this.childrens.length;
    },
    updateValue(path, value) {
      console.log(path, value);
      this.$set(this.item, path, value);
    },
    updateStringValues(path, value) {
      console.log(path, value);
      this.item[path] = value;
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
