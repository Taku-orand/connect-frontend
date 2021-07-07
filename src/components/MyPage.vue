<template>
  <div class="container">
    <h2 class="text-center m-5">マイページ</h2>
    <h4 class="mb-3"><i class="fas fa-portrait mr-2">ユーザー名: {{ $store.state.user.name }}</h4>
    <h4 class="mb-3"><i class="fas fa-envelope mr-2"></i>メールアドレス: {{ $store.state.user.email }}</h4>
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
