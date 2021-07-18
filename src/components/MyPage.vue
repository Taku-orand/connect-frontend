<template>
  <div class="container">
    <h2 class="text-center"><i class="fas fa-portrait mr-2"></i>マイページ</h2>
    <div class="card">
      <div class="card-body pb-0">
        <p class="mb-3 text-center"><i class="fas fa-user mr-2"></i>ユーザー名: {{ $store.state.user.name }}</p>
        <p class="mb-3 text-center"><i class="fas fa-envelope mr-2"></i>メールアドレス: {{ $store.state.user.email }}</p>
        <p class="mb-3 text-center"><i class="fas fa-thumbs-up mr-2"></i>合計いいね: {{ $store.state.likeSum }}</p>
      </div>
    </div>
    <QuestionList :is-my-page="true"></QuestionList>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
// import axios from "axios";
// import { useRoute } from "vue-router";
import { useStore } from "vuex";

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
    const store = useStore();

    const data = reactive({});

    onMounted(async () => {
      await store.dispatch("getMyQuestion");
      await store.dispatch("checkSignedIn");
      let likeSum = 0;
      store.state.questions.forEach((question) => {
        likeSum += question.like_count;
      });
      store.commit("setLikeSum", likeSum);
    });

    return {
      data,
    };
  },
};
</script>

<style scoped></style>
