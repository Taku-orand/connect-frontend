<template>
  <h2>this is question</h2>
</template>

<script>
import { reactive } from "vue";
// import axios from "axios";
import { useRoute } from "vue-router";

export default {
  props: {},
  setup() {
    // const router = useRouter();
    const route = useRoute();

    const data = reactive({
      test: Object,
    });

    function button() {
      console.log(route);
    }

    return {
      data,
      button,
    };
  },
};
</script>

<style scoped></style>
