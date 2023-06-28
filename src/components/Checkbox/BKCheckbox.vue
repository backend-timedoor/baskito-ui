<template>
  <div class="custom-control custom-checkbox" :id="parentId" :class="{'custom-control-inline': inline}">
    <input type="checkbox" class="custom-control-input" 
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
import { ref, watch, computed } from 'vue';

type CheckboxModelValueType = boolean | string | number | any[];

const props = withDefaults(
  defineProps<{
    id: string;
    name?: string;
    value?: boolean | string | number;
    uncheckedValue?: boolean | string | number;
    modelValue?: CheckboxModelValueType;
    label?: string;
    inline?: boolean;
    disabled?: boolean;
    checked?: boolean;
  }>(),
  {
    value: () => "on",
    uncheckedValue: () => "off",
    inline: () => false,
    disabled: () => false,
    checked: () => false
  }
);

const parentId = computed(() => {
  return props.id + "-wrapper";
});

const emit = defineEmits<{
  (e: "update:modelValue", value: CheckboxModelValueType): void;
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

const updateChecked = (modelValue: CheckboxModelValueType) => {
    if (Array.isArray(modelValue)) {
      if (modelValue.includes(props.value)) {
        isChecked.value = true;
      } else {
        isChecked.value = false;
      }
    } else if (typeof modelValue !== "boolean") {
        isChecked.value = modelValue === props.value;
    } else {
        isChecked.value = modelValue;
    }
};

if (props.modelValue) {
  updateChecked(props.modelValue);
}

const updateValue = (e: Event) => {
    const checked = (e.target as HTMLInputElement).checked;
    let returnValue: CheckboxModelValueType = checked;

    if (Array.isArray(props.modelValue)) {
      returnValue = props.modelValue;

      if (checked) {
        returnValue.push(props.value);
      } else {
        returnValue.splice(returnValue.indexOf(props.value), 1);
      }

      returnValue = JSON.parse(JSON.stringify(returnValue));
    } else if (typeof props.modelValue !== "boolean") {
      returnValue = checked ? props.value : props.uncheckedValue;
    }

    emit('update:modelValue', returnValue);
};
</script>