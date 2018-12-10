<template>
  <li class="node-tree">
    <span class="label">{{ node }}</span>
  </li>
</template>

<script>
export default {
  name: 'node',
  props: {
    node: Object,
  },
};
</script>
