<template>
  <div class="container">
    <h2 class="text-center m-4">質問一覧</h2>
    <template v-for="(question, key) in $store.state.questions" :key="key">
      <div @click="showDetail(question)" class="card mb-4">
        <div class="card-header">
          <div class="row">
            <div class="col-6">
              <div>{{ question.user_name }}</div>
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
              <button @click.stop="updateQuestion(question)" v-if="$store.state.user.id == question.user_id" class="btn btn-secondary mr-2">編集</button>
              <LikeButton :question="question" :is-my-page="false"></LikeButton>
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
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import LikeButton from "./LikeButton.vue";

export default {
  name: "QuestionList",

  components: {
    LikeButton,
  },
  props: {
    isMyPage: Boolean,
  },
  setup(props) {
    const router = useRouter();
    // const route = useRoute();
    const store = useStore();

    const data = reactive({});

    // QuestionListコンポーネントをロードした時に質問を取得
    onMounted(() => {
      if (props.isMyPage) {
        store.dispatch("getMyQuestions");
      } else {
        store.dispatch("getQuestions");
      }
    });

    function showDetail(question) {
      if (props.isMyPage) {
        router.push({
          path: `/question/detail/${question.id}`,
        });
      } else {
        router.push({
          path: `detail/${question.id}`,
        });
      }
    }

    function updateQuestion(question) {
      router.push({
        path: `/question/update/${question.id}`,
      });
    }

    return {
      data,
      showDetail,
      updateQuestion,
    };
  },
};
</script>

<style scoped></style>
