<template>
  <select ref="root" class="select2-hidden-accessible" :class="{ 'is-invalid': hasError }">
    <slot></slot>
  </select>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, PropType } from "vue";
import type { Options } from "select2";

type SelectValue = string | number | string[] | null;

const props = defineProps({
  modelValue: {
    type: [String, Number, Array] as PropType<SelectValue>,
    default: null
  },
  options: {
    type: Object as PropType<Options>,
    default: () => ({})
  },
  allowEmpty: {
    type: Boolean,
    default: false
  },
  hasError: {
    type: Boolean,
    default: false
  },
})

const emit = defineEmits<{
  (e: "update:modelValue", value: SelectValue | undefined): void;
}>();

onMounted(createSelect2);

onUnmounted(destroySelect2);

const root = ref<HTMLInputElement | null>(null);

watch(
  () => props.hasError,
  () => {
    destroySelect2();
    createSelect2();
  }
);

watch(
  () => props.modelValue,
  (modelValue) => {
    if (root.value) {
      $(root.value)
        .val(modelValue ?? "")
        .trigger("change");
    }
  }
);

watch(
  () => props.options,
  (options) => {
    destroySelect2();
    // eslint-disable-next-line no-prototype-builtins
    if (options.hasOwnProperty("data")) {
      if (root.value) {
        $(root.value).empty();
      }
    }
    createSelect2();
  },
  { deep: true }
);

function createSelect2() {
  if (root.value) {
    const select2 = $(root.value)
      .select2(props.options)
      .on("change", function () {
        const value = $(this).val();
        emit("update:modelValue", value);

        if (Array.isArray(value)) {
          // Helping CSS to know if multiple select is filled with options
          if (root.value) {
            const container = $(root.value).data("select2").$container;

            if (value.length) {
              container
                .find(".select2-selection--multiple")
                .addClass("select2-selection--filled");
            } else {
              container
                .find(".select2-selection--multiple")
                .removeClass("select2-selection--filled");
            }
          }
        }
      });

    // Get default value from modelValue prop
    let value = props.modelValue ?? "";

    // If not allowed for empty option and modelValue prop not properly provided
    if (!props.allowEmpty && !value) {
      // Get first option from select2
      value = select2.val() ?? "";
    }

    // Set default value for select2
    select2.val(value).trigger("change");
  }
}

function destroySelect2() {
  if (root.value) {
    $(root.value).off().select2("destroy");
  }
}
</script>

<style>
.select2-container.select2-container--disabled.select2-container--focus .select2-selection--multiple,
.select2-container.select2-container--disabled.select2-container--focus .select2-selection--single {
  border-color: #e9ecef;
  background-color: #e9ecef;
}
</style>
