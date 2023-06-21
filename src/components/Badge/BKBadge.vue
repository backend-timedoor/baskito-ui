<template>
  <span :class="badgeClass">
    <slot />
  </span>
</template>

<script setup lang="ts">
import type { BKBadgeType } from "../../types/components";

import { useBKBadge } from "../../composables/Badge/useBKBadge";
import { computed, type PropType } from "vue";

const { getClassType } = useBKBadge();

const props = defineProps({
  type: {
    type: String as PropType<BKBadgeType>,
    default: "primary",
  },
});

const badgeClass = computed(() => [
  {
    badge: true,
  },
  getClassType(props.type),
]);
</script>
