<template>
  <div>
    <h1 class="m-4">Form Generator</h1>
    <div class="container mt-2">
      <b-tabs>
        <b-tab class="m-5" title="Template">
          <pre>{{pre(template)}}</pre>
        </b-tab>
        <b-tab class="m-5" title="UI model">
          <pre>{{pre(contents.templateValues)}}</pre>
        </b-tab>
        <b-tab class="mt-3 col-10" title="UI">
          <div class="tree">
            <ul class="tree-list">
              <node-tree :item="contents" active="true"></node-tree>
            </ul>
          </div>
        </b-tab>
        <b-tab class="m-5" title="Serialized">
          <div :key="i" v-for="(value,i) in contents.templateValues">
            <strong>Template Value - {{i + 1}}</strong>
            <pre>{{pre(serialize(value))}}</pre>
          </div>
        </b-tab>
        <b-tab class="m-5" title="Deserialized">
          <div v-for="(value, i) in contents.templateValues" :key="i">
            <strong>Template Value - {{i + 1}}</strong>
            <pre>{{pre(deserialize(serialize(value)))}}</pre>
          </div>
        </b-tab>
      </b-tabs>
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
      template,
      contents: {
        templateValues: [parseTemplate(template)],
      },
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
    updateField() {},

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
