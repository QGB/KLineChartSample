<template>
  <div class="k-line-chart-container">
    <slot></slot>
    <h3 class="k-line-chart-title">{{ title }}</h3>
  </div>
</template>

<script>
export default {
  name: "ChartLayout",
  props: {
    title: String,
  },
};
</script>
