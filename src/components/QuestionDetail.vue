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
              <button @click.stop="updateSolved(question.id)" v-if="$store.state.user.id == question.user_id && !question.solved" class="btn btn-success mr-2">解決した！</button>
              <button @click.stop="updateQuestion(question)" v-if="$store.state.user.id == question.user_id && !question.solved" class="btn btn-secondary mr-2">編集</button>
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
              <LikeButton :question="answer" :is-my-page="false"></LikeButton>
            </div>
          </div>
        </div>
      </div>
    </template>

    <div class="answer-area mb-5">
      <CreateAnswer :question="$store.state.questionDetails"></CreateAnswer>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

import LikeButton from "./LikeButton.vue";
import CreateAnswer from "./CreateAnswer.vue";

export default {
  name: "Question",
  components: {
    LikeButton,
    CreateAnswer,
  },
  props: {
    tagList: Boolean,
  },
  setup(props, context) {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    const data = reactive({});

    // QuestionDetailコンポーネントをロードした時に質問詳細を取得
    onMounted(() => {
      context.emit("showTagList", props.tagList);
      store.dispatch("getQuestionDetails", route.params.id);
      store.dispatch("getAnswers", route.params.id);
    });

    async function updateSolved(id) {
      await store.dispatch("getQuestionDetails", id);
      await axios
        .patch(
          `${process.env.VUE_APP_CONNECT_BACKEND_URL}/questions/update/${id}`,
          {
            question: {
              title: store.state.questionDetails.title,
              content: store.state.questionDetails.content,
              anonymous: store.state.questionDetails.anonymous,
              solved: true,
              tag_ids: store.state.post_tags_id,
            },
          },
          { withCredentials: true }
        )
        .then((response) => {
          if (response.data.update_question) {
            store.commit("resetAlert");
            if (props.isMyPage) {
              store.dispatch("getMyQuestions");
            } else {
              store.dispatch("getQuestions");
            }
          } else {
            store.commit("setAlert", {
              flag: {
                showSuccessAlert: false,
                showErrorAlert: true,
              },
              message: {
                error: "処理に失敗しました。",
              },
            });
          }
        })
        .catch((e) => {
          alert(e);
        });
    }

    function updateQuestion(question) {
      router.push({
        path: `/question/update/${question.id}`,
      });
    }

    return {
      data,
      updateQuestion,
      updateSolved,
    };
  },
};
</script>

<style scoped>
.answer-card {
  border-color: var(--emphasis-color);
}
</style>
