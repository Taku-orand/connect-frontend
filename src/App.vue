<template>
  <Header></Header>
  <Alert></Alert>
  <router-view></router-view>
</template>

<script>
import { reactive, onMounted } from "vue";
import { useStore } from "vuex";

import Header from "./components/Header.vue";
import Alert from "./components/Alert.vue";

export default {
  name: "App",
  components: {
    Header,
    Alert,
  },
  props: {},
  setup() {
    const store = useStore();

    const data = reactive({
      user: Object,
    });

    onMounted(() => {
      store.dispatch("checkSignedIn");
    });

    return {
      data,
    };
  },
};
</script>

<style>
:root {
  --main-color: #39a0ed;
  --base-color: #ffffff;
  --sub-color: #32322c;
  --accent-color: #13c4a3;
  --sub-accent-color: #4c6085;
  --emphasis-color: #d991ba;
}

/* bootstrap */
.btn-primary,
.btn-primary:hover,
.btn-primary:focus {
  background-color: var(--accent-color);
  border-color: var(--accent-color);
}
.btn-secondary,
.btn-secondary:hover,
.btn-secondary:focus,
.show > .btn-secondary.dropdown-toggle {
  background-color: var(--sub-accent-color);
  border-color: var(--sub-accent-color);
}
.badge-secondary {
  background-color: var(--emphasis-color);
}
</style>
