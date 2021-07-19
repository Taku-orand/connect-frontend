import { createApp } from "vue";
import { router } from "./router.js";
import { store } from "./store.js";
import App from "./App.vue";
import VueAnalytics from "vue-analytics";

var app = createApp(App);
app.use(router);
app.use(store);
app.use(VueAnalytics, {
  id: "G-L0EN9QCWZ3",
  router,
});
app.mount("#app");
