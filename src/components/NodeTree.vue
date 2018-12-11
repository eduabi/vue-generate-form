<template>
  <li class="node-tree" v-if="active">
    <div v-if="isNaN(itemKey) && nodeType !== 'list'">{{itemKey}}</div>
    <div v-if="nodeType === 'list'" class="list-control">
      {{itemKey}}
      <span v-if="nodeType === 'list'">{{activeIndex + 1}}/{{childrens.length}}</span>
      <button @click="previous" class="btn btn-link">⟵</button>
      <button @click="addNode" class="btn btn-link">Add</button>
      <button @click="removeNode" :disabled="childrens.length < 2" class="btn btn-link">Remove</button>
      <button @click="next" class="btn btn-link">⟶</button>
    </div>
    <div v-if="nodeType === 'array'">
      <button @click="addNode" class="btn btn-link">Add</button>
    </div>
    <ul>
      <key-input
        v-for="(field,i) in fields"
        :parentType="nodeType"
        :id="field"
        :key="field"
        :label="field"
        :fieldValue="item[field]"
        :path="generatePath(field,i)"
        :fieldToUpdate="field"
        placeholder="Type here..."
        type="text"
        @callback="updateValue"
        @removeNode="removeArrayNode"
      />
      <node
        v-for="(child,i) in childrens"
        :nodeType="getType(item[child])"
        :path="generatePath(child,i)"
        :item="item[child]"
        :itemKey="child"
        :key="i"
        :active="nodeType === 'list' ? i === activeIndex : true"
        @addNode="addNode"
        @callback="updateValue"
      ></node>
    </ul>
  </li>
</template>

<script>
import _ from 'lodash';
import KeyInput from './KeyInput';

export default {
  name: 'node',
  props: [
    'item',
    'level',
    'path',
    'index',
    'itemKey',
    'active',
    'isList',
    'nodeType',
  ],

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
      return Object.keys(this.item).filter(
        k => typeof this.item[k] === 'string',
      );
    },

    childrens() {
      return Object.keys(this.item).filter(
        k => typeof this.item[k] !== 'string',
      );
    },
  },
  methods: {
    getType(o) {
      if (_.isArray(o)) {
        if (_.isObject(o[0])) {
          return 'list';
        }
        return 'array';
      } else if (_.isObject(o)) {
        return 'object';
      }
      return 'string';
    },
    isActive(child) {
      const k = parseInt(child, 10);
      if (k && !isNaN(k)) {
        return k === this.activeIndex;
      }
      return true;
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
    addNode() {
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
        this.$nextTick(() => {
          this.previous();
        });
      }
    },
    removeArrayNode(i) {
      if (this.item.length > 1) {
        this.item.splice(i, 1);
      }
    },
    previous() {
      this.activeIndex =
        (this.activeIndex + (this.item.length - 1)) % this.item.length;
    },
    next() {
      this.activeIndex =
        (this.activeIndex + this.item.length + 1) % this.item.length;
    },
    updateValue(path, value) {
      this.$set(this.item, path, value);
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
