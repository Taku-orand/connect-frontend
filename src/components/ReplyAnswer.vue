<template>
  <div class="container">
    this is reply answer
  </div>
</template>

<script>
import { reactive } from "vue";
// import axios from "axios";
// import { useRouter } from "vue-router";
// import { useStore } from "vuex";

export default {
  name: "QuestionList",
  components: {},
  props: {},
  setup() {
    // const router = useRouter();
    // const route = useRoute();
    // const store = useStore();

    const data = reactive({});

    return {
      data,
    };
  },
};
</script>

<style scoped></style>
