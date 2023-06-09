<template>
  <component :is="'a'" :class="badgeClass" :href="href" @click="handleClick">
    <slot />
  </component>
</template>

<script setup lang="ts">
import type { BKBadgeType } from "../../types/components";
import { useBKBadge } from "../../composables/Badge/useBKBadge";
import { computed, inject, PropType } from "vue";
import { router, shouldIntercept } from "@inertiajs/core";

const inertia = inject("inertia-router", router);
const { getClassType } = useBKBadge();

const props = defineProps({
  type: {
    type: String as PropType<BKBadgeType>,
    default: "primary",
  },
  href: {
    type: String,
    required: true,
  },
  preserveScroll: {
    type: Boolean,
    default: false,
  },
  preserveState: {
    type: Boolean,
    default: false,
  },
});

const badgeClass = computed(() => [
  {
    badge: true,
  },
  getClassType(props.type),
]);

const handleClick = (event: Event) => {
  if (shouldIntercept(event as KeyboardEvent)) {
    event.preventDefault();
    event.stopImmediatePropagation();

    inertia.visit(props.href, {
      preserveScroll: props.preserveScroll,
      preserveState: props.preserveState,
    });
  }
};
</script>
