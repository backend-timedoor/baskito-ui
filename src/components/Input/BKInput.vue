<template>
  <input
    class="form-control"
    :value="modelValue"
    :type="type"
    :class="inputClass"
    :placeholder="placeholder"
    @input="emitInput"
  />
</template>

<script setup lang="ts">
import { PropType, computed } from "vue";

type InputSize = "sm" | "md" | "lg";
type InputType =
  | "button"
  | "checkbox"
  | "text"
  | "number"
  | "date"
  | "email"
  | "hidden"
  | "file"
  | "password"
  | "range"
  | "reset"
  | "submit"
  | "tel"
  | "time"
  | "url"
  | "week";

const sizes = {
  sm: "form-control form-control-sm",
  md: "form-control",
  lg: "form-control form-control-lg"
};

const getClassSize = (size: InputSize) => sizes[size];

const props = defineProps({
    type: {
        type: String as PropType<InputType>,
        default: "text"
    },
    size: {
        type: String as PropType<InputSize>,
        default: "md"
    },
    modelValue: {
        type: String,
        default: ""
    },
    placeholder: {
        type: String,
        default: ""
    }
})

const emit = defineEmits<{
  (e: "update:modelValue", value: string | null): void;
}>();

const emitInput = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};

const inputClass = computed(() => [getClassSize(props.size)]);
</script>
