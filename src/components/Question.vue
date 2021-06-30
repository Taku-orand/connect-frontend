<template>
  <router-view></router-view>
</template>

<script>
import { reactive } from "vue";
// import axios from "axios";
// import { useRoute } from "vue-router";
// import { useStore } from "vuex";

export default {
  name: "Question",
  components: {},
  props: {},
  setup() {
    // const router = useRouter();
    // const route = useRoute();
    // const store = useStore();

    const data = reactive({});

    function showDetail(question) {
      console.log(question);
    }

    return {
      data,
      showDetail,
    };
  },
};
</script>

<style scoped></style>
