<template>
  <div>auth0</div>
</template>

<script>
import { reactive } from "vue";
// import { useStore } from "vuex";
import { lock } from "../auth0.js";

export default {
  name: "Alert",
  props: {
    user: Object,
  },
  setup() {
    // const store = useStore();

    const data = reactive({});

    lock.show();

    return {
      data,
    };
  },
};
</script>

<style scoped></style>
