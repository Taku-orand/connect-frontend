<template>
  <div class="container">
    <h2 class="text-center m-5">マイページ</h2>
    <p class="text-center">{{ $store.state.user.email }}</p>
    <QuestionList :is-my-page="true"></QuestionList>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
// import axios from "axios";
// import { useRoute } from "vue-router";
// import { useStore } from "vuex";

import QuestionList from "./QuestionList.vue";

export default {
  name: "MyPage",
  components: {
    QuestionList,
  },
  props: {},
  setup() {
    // const router = useRouter();
    // const route = useRoute();
    // const store = useStore();

    const data = reactive({});

    onMounted(() => {});

    return {
      data,
    };
  },
};
</script>

<style scoped></style>
