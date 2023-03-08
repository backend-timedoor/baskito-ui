<!-- eslint-disable vue/no-v-html -->
<template>
  <nav v-if="links.length > 3">
    <ul class="pagination">
      <li
        v-for="(link, index) in props.links"
        :key="index"
        class="page-item"
        :class="{ active: link.active, disabled: link.url === null }"
      >
        <Link
          class="page-link"
          :preserve-scroll="props.preserveScroll"
          :preserve-state="props.preserveState"
          :href="link.url ?? '#'"
        >
          <span v-html="link.label" />
        </Link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { Link } from "@inertiajs/inertia-vue3";
import { PropType } from "vue";
import { BKPaginationLink } from "../../types/components";

const props = defineProps({
  links: {
    type: Array as PropType<BKPaginationLink[]>,
    required: true,
  },
  preserveScroll: {
    type: Boolean,
    default: true,
  },
  preserveState: {
    type: Boolean,
    default: true,
  },
});
</script>
