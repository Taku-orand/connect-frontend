import { createApp } from "vue";
import { router } from "./router.js";
import { store } from "./store.js";
import App from "./App.vue";
import VueGtag from "vue-gtag-next";

var app = createApp(App);
app.use(router);
app.use(store);
app.use(VueGtag, { property: { id: `${process.env.GOOGLE_ANALYTICS_ID}`, router } });
app.mount("#app");
