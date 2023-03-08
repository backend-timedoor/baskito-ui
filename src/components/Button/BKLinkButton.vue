<template>
    <Link :class="buttonClass" :href="href" :disabled="props.disabled">
      <slot></slot>
    </Link>
  </template>
  
  <script setup lang="ts">
  import type {
    BKButtonSize,
    BKButtonVariant,
    BKButtonShape
  } from "../../types/components";
  import { useBKButton } from "../../composables/Button/useBKButton";
  import { computed, PropType } from "vue";
  import { Link } from "@inertiajs/inertia-vue3";
  
  const { getClassVariant, getClassSize, getClassShape } = useBKButton();
  
  const props = defineProps({
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
  })
  
  const buttonClass = computed(() => [
    {
      btn: true,
      disabled: props.disabled,
      "btn-block": props.block,
      "btn-progress": props.progress
    },
    getClassVariant(props.variant),
    getClassSize(props.size),
    getClassShape(props.shape)
  ]);
  </script>
  