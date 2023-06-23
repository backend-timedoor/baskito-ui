import { App, Plugin } from "vue";

import * as Components from "./components";
import { router } from "@inertiajs/core";

interface Config {
  router?: typeof router;
}

// Inject all components into the global @vue/runtime-core
// This allows intellisense in templates w/out direct importing
declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    BKButton: typeof Components.BKButton;
    BKLinkButton: typeof Components.BKLinkButton;
    BKPagination: typeof Components.BKPagination;
    BKInput: typeof Components.BKInput;
    BKSelect: typeof Components.BKSelect;
    BKModal: typeof Components.BKModal;
    BKAlert: typeof Components.BKAlert;
    BKCard: typeof Components.BKCard;
    BKBadge: typeof Components.BKBadge;
    BKTable: typeof Components.BKTable;
  }
}

// Main app plugin
const plugin: Plugin = {
  // TODO: use options in the future
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  install(app: App, config: Config) {
    Object.entries(Components).forEach(([name, component]) => {
      app.component(name, component);
    });

    app.provide(
      "inertia-router",
      config && config.router ? config.router : router
    );
  },
};

export * from "./components";
export * as Components from "./components";
export * from "./composables";
export * from "./types";

export { plugin as Baskito };
export default plugin;
