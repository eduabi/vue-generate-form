<template>
  <div>
    <div class="tree">
      <ul class="tree-list">
        <node-tree
          v-for="(item,i) in templates"
          :key="i"
          :index="i"
          :item="item"
          :path="item.name"
          :level="0"
        ></node-tree>
      </ul>
    </div>
  </div>
</template>
<script>
import { template } from '../data';
import { serialize, deserialize, parseTemplate } from '../helpers';
import NodeTree from './NodeTree';
// import Node from './Node';

export default {
  name: 'template-content',
  data() {
    return {
      templates: template,
    };
  },
  components: {
    NodeTree,
  },
  methods: {
    serialize,
    deserialize,
    parseTemplate,
    entries(obj) {
      return Object.entries(obj);
    },
    updateField(field, text) {
      // this.fields[field] = text;
      // console.log(text);
    },
  },
};
</script>

<style>
.tree-list ul {
  padding-left: 16px;
  margin: 6px 0;
}
</style>
