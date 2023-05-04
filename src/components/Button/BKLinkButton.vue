<template>
  <component
    :is="Link"
    :class="buttonClass"
    :href="href"
    :disabled="props.disabled"
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
import { Link } from "@inertiajs/vue3";

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
</script>
