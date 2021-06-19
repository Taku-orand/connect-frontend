<template>
  <div class="row">
    <div class="col-3">
      <Tag></Tag>
    </div>
    <div class="col-9">
      <div class="container">
        <h2 class="text-center m-4">質問一覧</h2>
        <template v-for="(question, key) in $store.state.questions" :key="key">
          <div class="card mb-4">
            <div class="card-header">
              <div class="row">
                <div class="col-6">
                  <div>質問者</div>
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
                  <div class="mt-2">{{ question.updated_at }}</div>
                </div>
                <div class="col-6 text-right">
                  <button type="button" class="btn btn-primary">
                    いいね <span class="badge badge-light">{{ question.like }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
// import axios from "axios";
// import { useRoute } from "vue-router";
import { useStore } from "vuex";

import Tag from "./Tag.vue";

export default {
  name: "Question",
  components: {
    Tag,
  },
  props: {},
  setup() {
    // const router = useRouter();
    // const route = useRoute();
    const store = useStore();

    const data = reactive({
      test: Object,
    });

    // Questionコンポーネントをロードした時に質問を取得
    onMounted(() => {
      store.dispatch("getQuestions");
    });

    return {
      data,
    };
  },
};
</script>

<style scoped></style>
