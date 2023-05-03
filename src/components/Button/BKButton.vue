<template>
    <button :class="buttonClass" :disabled="props.disabled">
      <slot></slot>
    </button>
  </template>
  
<script setup lang="ts">
  import type {
    BKButtonSize,
    BKButtonVariant,
    BKButtonShape,
    BKButtonColor
  } from "../../types/components";
  import { useBKButton } from "../../composables/Button/useBKButton";
  import { computed, type PropType } from "vue";
  
  const { getClassVariant, getClassSize, getClassShape } = useBKButton();

  const props = defineProps({
    color: {
      type: String as PropType<BKButtonColor>,
      default: "primary"
    },
    variant: {
      type: String as PropType<BKButtonVariant>,
      default: "fill"
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
    }
  })
  
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
  