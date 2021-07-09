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
body {
  font-family: "Kosugi Maru", sans-serif;
  color: var(--sub-color);
}

a {
  color: var(--sub-color);
}

:root {
  --main-color: #39a0ed;
  --base-color: #ffffff;
  --sub-color: #32322c;
  --accent-color: #13c4a3;
  --sub-accent-color: #4c6085;
  --emphasis-color: #d991ba;
  --silver-color: #eeeeee;
  --table-head-color: #c0c0c0;
}

/* bootstrap */
/* ヘッダーと同じ色のボタン */
.btn-info,
.btn-info:hover,
.btn-info:focus {
  background-color: var(--main-color);
  border-color: var(--main-color);
}
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
.btn-success,
.btn-success:hover,
.btn-success:focus,
.show > .btn-success.dropdown-toggle {
  background-color: var(--emphasis-color);
  border-color: var(--emphasis-color);
}
.badge-primary {
  background-color: var(--accent-color);
}
.badge-secondary {
  background-color: var(--emphasis-color);
}

h2 {
  margin: 2rem;
}

@media screen and (max-width: 959px) {
  /* 959px以下に適用されるCSS（タブレット用） */
}
@media screen and (max-width: 480px) {
  /* 480px以下に適用されるCSS（スマホ用） */
  body {
    font-size: 0.8rem;
  }
  h2 {
    font-size: 1rem;
    margin: 1rem;
  }
  .btn {
    font-size: 0.5rem;
  }
}
</style>
