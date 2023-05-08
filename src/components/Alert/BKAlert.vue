<template>
  <div :class="alertClass" role="alert">
    <div v-if="props.icon !== null" class="alert-icon"><i :class="props.icon"></i></div>
    <div class="alert-body">
      <div v-if="props.title !== null" class="alert-title">{{ props.title }}</div>
      <slot></slot>
      <button
        v-if="props.dismissible"
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Color } from "../../types";
import { PropType, computed } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: null
  },
  color: {
    type: String as PropType<Color>,
    default: "primary"
  },
  dismissible: {
    type: Boolean,
    default: false
  },
  fade: {
    type: Boolean,
    default: false
  },
  show: {
    type: Boolean,
    default: true
  },
  icon: {
    type: String,
    default: null
  }
});

const getColorClass = (color: Color) => {
  const colorClasses = {
    primary: "alert-primary",
    secondary: "alert-secondary",
    success: "alert-success",
    danger: "alert-danger",
    warning: "alert-warning",
    info: "alert-info",
    light: "alert-light",
    dark: "alert-dark"
  };

  return colorClasses[color];
};

const alertClass = computed(() => [
  {
    alert: true,
    "alert-dismissible": props.dismissible,
    "alert-has-icon": props.icon,
    fade: props.dismissible && props.fade,
    show: props.show
  },
  getColorClass(props.color)
]);
</script>
