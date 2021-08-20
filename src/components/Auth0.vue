<template>
  <div>auth0</div>
</template>

<script>
import { reactive } from "vue";
// import { useStore } from "vuex";

export default {
  name: "Alert",
  props: {
    user: Object,
  },
  setup() {
    // const store = useStore();

    const data = reactive({});

    return {
      data,
    };
  },
};
</script>

<style scoped></style>
