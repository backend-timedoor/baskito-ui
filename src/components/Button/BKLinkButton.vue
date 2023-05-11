<template>
  <component
    :is="'a'"
    :class="buttonClass"
    :href="href"
    :disabled="props.disabled"
    :v-bind="$attrs"
    @click="handleClick"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import type {
  BKButtonSize,
  BKButtonVariant,
  BKButtonShape,
  BKButtonColor
} from "../../types/components";
import { useBKButton } from "../../composables/Button/useBKButton";
import { computed, PropType } from "vue";
import { shouldIntercept } from "@inertiajs/core";
import { router } from "@inertiajs/vue3";

const { getClassVariant, getClassSize, getClassShape } = useBKButton();

const props = defineProps({
  color: {
    type: String as PropType<BKButtonColor>,
    default: "primary"
  },
  variant: {
    type: String as PropType<BKButtonVariant>,
    default: "primary"
  },
  block: {
    type: Boolean,
    default: false
  },
  size: {
    type: String as PropType<BKButtonSize>,
    default: "md"
  },
  shape: {
    type: String as PropType<BKButtonShape>,
    default: "default"
  },
  disabled: {
    type: Boolean,
    default: false
  },
  progress: {
    type: Boolean,
    default: false
  },
  href: {
    type: String,
    required: true
  },
  preserveScroll: {
    type: Boolean,
    default: false
  },
  preserveState: {
    type: Boolean,
    default: false
  },
  visit: {
    type: Boolean,
    default: false
  }
});

const buttonClass = computed(() => [
  {
    btn: true,
    disabled: props.disabled,
    "btn-block": props.block,
    "btn-progress": props.progress
  },
  getClassVariant(props.variant, props.color),
  getClassSize(props.size),
  getClassShape(props.shape)
]);

const handleClick = (event: Event) => {
  console.log(shouldIntercept(event as KeyboardEvent))

  event.preventDefault();
  event.stopImmediatePropagation();

  console.log(shouldIntercept(event as KeyboardEvent))
  
  if (props.visit) {
    router.visit(props.href, {
        preserveScroll: props.preserveScroll,
        preserveState: props.preserveState
    });
  }
  
  return;
  // if (shouldIntercept(event)) {
  //   event.preventDefault();

  //   
  // }
};
</script>
