<template>
  <div :class="cardClass">
    <component :is="headerTag" v-if="$slots.header || header" :class="cardHeaderClass">
      <slot name="header">
        <h4>{{ header }}</h4>
      </slot>
    </component>
    <component :is="bodyTag" :class="cardBodyClass">
      <slot></slot>
    </component>
    <component :is="footerTag" v-if="$slots.footer || footer" :class="cardFooterClass">
      <slot name="footer">
        {{ footer }}
      </slot>
    </component>
  </div>
</template>

<script setup lang="ts">
import { Color, BackgroundColor } from "../../types"
import { useBackgroundColor } from "../../composables/BackgroundColor/useBackgroundColor";
import { computed, type PropType } from "vue";

const { getBackgroundClass } = useBackgroundColor();

const cardVariants = {
  primary: "card-primary",
  secondary: "card-secondary",
  danger: "card-danger",
  success: "card-success",
  warning: "card-warning",
  info: "card-info",
  light: "card-light",
  dark: "card-dark",
};

const props = defineProps({
  header: {
    type: String,
    default: ""
  },
  footer: {
    type: String,
    default: ""
  },
  headerTag: {
    type: String,
    default: "div"
  },
  bodyTag: {
    type: String,
    default: "div"
  },
  footerTag: {
    type: String,
    default: "div"
  },
  headerClass: {
    type: String,
    default: ""
  },
  bodyClass: {
    type: String,
    default: ""
  },
  footerClass: {
    type: String,
    default: ""
  },
  variant: {
    type: String as PropType<Color>,
    default: ""
  },
  headerBgVariant: {
    type: String as PropType<BackgroundColor>,
    default: ""
  },
  bodyBgVariant: {
    type: String as PropType<BackgroundColor>,
    default: ""
  },
  footerBgVariant: {
    type: String as PropType<BackgroundColor>,
    default: ""
  },
  progress: {
    type: Boolean,
    default: false
  }
})
  
const cardClass = computed(() => [
  {
    card: true,
    "card-progress": props.progress,
  },
  getCardVariantClass(props.variant),
]);

const cardHeaderClass = computed(() => [
  {
    "card-header": true,
  },
  getBackgroundClass(props.headerBgVariant),
  props.headerClass,
]);

const cardBodyClass = computed(() => [
  {
    "card-body": true,
  },
  getBackgroundClass(props.bodyBgVariant),
  props.bodyClass,
]);

const cardFooterClass = computed(() => [
  {
    "card-footer": true,
  },
  getBackgroundClass(props.footerBgVariant),
  props.footerClass,
]);

const getCardVariantClass = (
  color: Color
): string => {
  return cardVariants[color];
};
</script>
