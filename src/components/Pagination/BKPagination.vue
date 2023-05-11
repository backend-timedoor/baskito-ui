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
        <a
          class="page-link"
          :href="link.url ?? '#'"
          @click="handleClick($event, link.url ?? '#')"
        >
          <span v-html="link.label" />
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { PropType, inject } from "vue";
import { BKPaginationLink } from "../../types/components";
import { router, shouldIntercept } from "@inertiajs/core";

const inertia = inject("inertia-router", router);

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

const handleClick = (event: Event, url: string) => {
  if (shouldIntercept(event as KeyboardEvent)) {
    event.preventDefault();
    event.stopImmediatePropagation();
    
    inertia.visit(url, {
        preserveScroll: props.preserveScroll,
        preserveState: props.preserveState
    });
  }
}
</script>
