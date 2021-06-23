<template>
  <div class="container">
    <h2 class="text-center m-4">質問詳細</h2>
    <!-- questionの中身が読み込まれているか確認 -->
    <template v-if="$store.state.questionDetails.question">
      <div class="card mb-4">
        <div class="card-header">
          <div class="row">
            <div class="col-6">
              <div>質問者</div>
            </div>
            <div class="col-6 text-right">
              <span v-if="$store.state.questionDetails.question.solved" class="badge badge-secondary p-2">解決済</span>
            </div>
          </div>
        </div>
        <div class="card-body">
          <h5 class="card-title">{{ $store.state.questionDetails.question.title }}</h5>
          <p class="card-text">{{ $store.state.questionDetails.question.content }}</p>
        </div>
        <div class="card-footer text-muted">
          <div class="row">
            <div class="col-6">
              <div class="mt-2">{{ $store.state.questionDetails.question.updated_at }}</div>
            </div>
            <div class="col-6 text-right">
              <button type="button" class="btn btn-primary">
                いいね <span class="badge badge-light">{{ $store.state.questionDetails.question.like }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>

    <div>
      <button class="btn btn-info">回答する</button>
    </div>

    <!-- 回答を表示 -->
    <template v-for="(answer, key) in $store.state.answers" :key="key">
      <div class="card mb-4 answer-card">
        <div class="card-header">
          <div class="row">
            <div class="col-6">
              <div>回答者</div>
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
              <button type="button" class="btn btn-primary">
                いいね <span class="badge badge-light">{{ answer.like }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
// import axios from "axios";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "Question",
  components: {},
  props: {},
  setup() {
    // const router = useRouter();
    const route = useRoute();
    const store = useStore();

    const data = reactive({});

    // QuestionDetailコンポーネントをロードした時に質問詳細を取得
    onMounted(() => {
      store.dispatch("getQuestionDetails", route.params.id);
      store.dispatch("getAnswers", route.params.id);
    });

    return {
      data,
    };
  },
};
</script>

<style scoped>
.answer-card {
  border-color: var(--emphasis-color);
}
</style>
