<template>
  <div class="container">
    <h2 class="text-center m-4">質問詳細</h2>
    <!-- questionの中身が読み込まれているか確認 -->
    <template v-if="(question = $store.state.questionDetails)">
      <div class="card mb-4">
        <div class="card-header">
          <div class="row">
            <div class="col-6">
              <div v-if="question.anonymous">匿名</div>
              <div v-else>{{ question.user_name }}</div>
            </div>
            <div class="col-6 text-right">
              <span v-if="question.solved" class="badge badge-secondary p-2">解決済</span>
            </div>
          </div>
        </div>
        <div class="card-body">
          <h5 class="card-title">{{ question.title }}</h5>
          <p class="card-text">{{ question.content }}</p>
        </div>
        <div class="card-footer text-muted">
          <div class="row">
            <div class="col-6">
              <div v-if="question.updated_at" class="mt-2">{{ question.updated_at.substr(0, 4) }}/{{ question.updated_at.substr(5, 2) }}/{{ question.updated_at.substr(8, 2) }}</div>
            </div>
            <div class="col-6 text-right">
              <button @click.stop="updateQuestion(question)" v-if="$store.state.user.id == question.user_id" class="btn btn-secondary mr-2">編集</button>
              <LikeButton :question="question" :is-my-page="false"></LikeButton>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- 回答を表示 -->
    <template v-for="(answer, key) in $store.state.answers" :key="key">
      <div class="card mb-4 answer-card">
        <div class="card-header">
          <div class="row">
            <div class="col-6">
              <div v-if="answer.anonymous">匿名</div>
              <div v-else>{{ answer.user_name }}</div>
            </div>
            <div class="col-6 text-right"></div>
          </div>
        </div>
        <div class="card-body">
          <p class="card-text">{{ answer.content }}</p>
        </div>
        <div class="card-footer text-muted">
          <div class="row">
            <div class="col-6">
              <div class="mt-2">{{ answer.updated_at }}</div>
            </div>
            <div class="col-6 text-right">
              <LikeButton :question="question" :is-my-page="false"></LikeButton>
            </div>
          </div>
        </div>
      </div>
    </template>

    <div class="answer-area mb-5">
      <h2 class="text-center m-4">回答</h2>
      <Form></Form>
      <button @click="createAnswer()" class="btn btn-primary">回答投稿</button>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
// import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

import LikeButton from "./LikeButton.vue";
import Form from "./Form.vue";

export default {
  name: "Question",
  components: {
    LikeButton,
    Form,
  },
  props: {},
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    const data = reactive({});

    // QuestionDetailコンポーネントをロードした時に質問詳細を取得
    onMounted(() => {
      store.dispatch("getQuestionDetails", route.params.id);
      store.dispatch("getAnswers", route.params.id);
    });

    function updateQuestion(question) {
      router.push({
        path: `/question/update/${question.id}`,
      });
    }

    return {
      data,
      updateQuestion,
    };
  },
};
</script>

<style scoped>
.answer-card {
  border-color: var(--emphasis-color);
}
</style>
