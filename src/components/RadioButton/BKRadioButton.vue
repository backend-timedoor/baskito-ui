<template>
  <div class="custom-control custom-radio" :id="parentId" :class="{'custom-control-inline': inline}">
    <input type="radio" class="custom-control-input" 
      :id="id"
      :name="name" 
      :value="value"
      :disabled="disabled" 
      :checked="isChecked"
      @input="updateValue">
    <label class="custom-control-label" :for="id">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
import { type PropType, ref, watch, computed } from 'vue';

type RadioButtonModelValueType = string | number | null;

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    default: ""
  },
  value: {
    type: String,
    default: "on"
  },
  modelValue: {
    type: [String, Number, Boolean, Array] as PropType<RadioButtonModelValueType>,
    default: () => ""
  },
  label: {
    type: String,
    default: ""
  },
  inline: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  checked: {
    type: Boolean,
    default: false
  }
});

const parentId = computed(() => {
  return props.id + "-parent";
});

const emit = defineEmits<{
  (e: "update:modelValue", value: RadioButtonModelValueType): void;
}>();

const isChecked = ref(props.checked);

watch(
  () => props.modelValue,
  (modelValue) => {
    if (modelValue) {
      updateChecked(modelValue);
    }
  }
);

const updateChecked = (modelValue: RadioButtonModelValueType) => {
    if (modelValue == props.value) {
        isChecked.value = true;
    } else {
        isChecked.value = false;
    }
};

if (props.modelValue) {
  updateChecked(props.modelValue);
}

const updateValue = (e: Event) => {
    emit('update:modelValue', props.value);
};
</script>