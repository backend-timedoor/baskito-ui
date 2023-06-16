<template>
  <div :class="cardClass">
    <component :is="headerTag" :class="cardHeaderClass" v-if="$slots.header || header">
      <slot name="header">
        <h4>{{ header }}</h4>
      </slot>
    </component>
    <component :is="bodyTag" :class="cardBodyClass">
      <slot></slot>
    </component>
    <component :is="footerTag" :class="cardFooterClass" v-if="$slots.footer || footer">
      <slot name="footer">
        {{ footer }}
      </slot>
    </component>
  </div>
</template>

<script setup lang="ts">
import { Color, BackgroundColor } from "../../types"
import { computed, type PropType } from "vue";

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

const backgroundVariants = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  danger: "bg-danger",
  success: "bg-success",
  warning: "bg-warning",
  info: "bg-info",
  light: "bg-light",
  dark: "bg-dark",
  whitesmoke: "bg-whitesmoke",
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
  getBackgroundVariantClass(props.headerBgVariant),
  props.headerClass,
]);

const cardBodyClass = computed(() => [
  {
    "card-body": true,
  },
  getBackgroundVariantClass(props.bodyBgVariant),
  props.bodyClass,
]);

const cardFooterClass = computed(() => [
  {
    "card-footer": true,
  },
  getBackgroundVariantClass(props.footerBgVariant),
  props.footerClass,
]);

const getCardVariantClass = (
  color: Color
): string => {
  return cardVariants[color];
};

const getBackgroundVariantClass = (
  color: BackgroundColor
): string => {
  return backgroundVariants[color];
};
</script>
