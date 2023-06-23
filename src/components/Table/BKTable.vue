<template>
  <div :class="parentClass">
    <table :class="tableClass">
      <caption v-if="props.caption">{{ props.caption }}</caption>
      <slot></slot>
    </table>
  </div>
</template>

<script setup lang="ts">
import { type PropType, computed } from "vue";

type BKTableSize = "sm" | "md" | "lg";

const sizeVariantClass = {
  sm: "table-sm",
  md: "table-md",
  lg: "",
};

const props = defineProps({
  dark: {
    type: Boolean,
    default: () => false
  },
  striped: {
    type: Boolean,
    default: () => false
  },
  bordered: {
    type: Boolean,
    default: () => false
  },
  size: {
    type: String as PropType<BKTableSize>,
    default: () => "lg"
  },
  hover: {
    type: Boolean,
    default: () => false
  },
  caption: {
    type: String,
    default: () => null
  },
  responsive: {
    type: Boolean,
    default: () => true
  }
});

const parentClass = computed(() => [
  {
    "table-responsive": props.responsive
  }
]);

const tableClass = computed(() => [
  {
    table: true,
    "table-dark": props.dark,
    "table-striped": props.striped,
    "table-bordered": props.bordered,
    "table-hover": props.hover,
  },
  getSizeVariantClass(props.size),
]);

function getSizeVariantClass(size: BKTableSize) {
  return [sizeVariantClass[size]]
}
</script>