<template>
  <div>
    <b-tabs>
      <b-tab title="template">
        <pre>{{pre(template)}}</pre>
      </b-tab>
      <b-tab title="UI model">
        <pre>{{pre(contents[0])}}</pre>
      </b-tab>
      <b-tab title="UI">
        <div class="tree">
          <ul class="tree-list">
            <node-tree
              v-for="(item,i) in contents"
              :key="i"
              :index="i"
              :item="item"
              :level="0"
              :active="true"
            ></node-tree>
          </ul>
        </div>
      </b-tab>
      <b-tab title="backend">
        <pre>{{pre(serialize(contents[0]))}}</pre>
      </b-tab>
      <b-tab title="deserialized">
        <pre>{{pre(deserialize(serialize(contents[0])))}}</pre>
      </b-tab>
    </b-tabs>
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
      contents: [parseTemplate(template)],
      template: template,
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

    pre(o) {
      return JSON.stringify(o, null, 2);
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
