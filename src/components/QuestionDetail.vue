<template>
  <div class="container">
    <h2 class="text-center"><i class="fas fa-info-circle mr-2"></i>質問詳細</h2>
    <!-- questionの中身が読み込まれているか確認 -->
    <template v-if="(question = $store.state.questionDetails)">
      <div class="card mb-2 mb-md-4">
        <div class="card-header">
          <div class="row">
            <div class="col-6">
              <p v-if="question.anonymous" class="m-0"><i class="fas fa-user mr-2"></i>匿名</p>
              <p v-else class="m-0"><i class="fas fa-user mr-2"></i>{{ question.user_name }}</p>
            </div>
            <div class="col-6 text-right">
              <span v-if="question.solved" class="badge badge-secondary p-1 p-md-2"><i class="fas fa-check-circle mr-1"></i>解決済</span>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <h5 class="m-0">{{ question.title }}</h5>
            </div>
          </div>
        </div>
        <div class="card-body">
          <Markdown :source="String(question.content)" :linkify="true" :emoji="data.emoji" :breaks="data.breaks" />
        </div>
        <div class="card-footer text-muted">
          <div class="row">
            <div class="col-6 pr-0">
              <p v-if="question.updated_at" class="m-0">{{ question.updated_at.substr(0, 4) }}/{{ question.updated_at.substr(5, 2) }}/{{ question.updated_at.substr(8, 2) }}</p>
            </div>
            <div class="col-6 pl-0 text-right">
              <button @click.stop="updateQuestion(question)" v-if="$store.state.user.id == question.user_id && !question.solved && $store.state.user.id != 0" class="btn btn-secondary p-1 p-md-2 mr-2"><i class="fas fa-edit mr-1"></i>編集</button>
              <LikeButton :question="question" :is-my-page="false" :isQuestionDetails="true" :isAnswer="false"></LikeButton>
            </div>
          </div>
        </div>
      </div>
    </template>

    <div class="badge badge-secondary text-left w-100 p-2 mb-2 mb-md-3">{{ $store.state.answers.length }}件の回答</div>

    <!-- 回答を表示 -->
    <div :class="data.answerArea">
      <template v-for="(answer, key) in $store.state.answers" :key="key">
        <div class="card mb-4 answer-card">
          <div class="card-header">
            <div class="row">
              <div class="col-6">
                <div v-if="answer.anonymous"><i class="fas fa-user mr-2"></i>匿名</div>
                <div v-else><i class="fas fa-user mr-2"></i>{{ answer.user_name }}</div>
              </div>
              <div class="col-6 text-right"></div>
            </div>
          </div>
          <div class="card-body">
            <Markdown :source="String(answer.content)" :linkify="true" :emoji="data.emoji" :breaks="data.breaks" />
          </div>
          <div class="card-footer text-muted">
            <div class="row">
              <div class="col-6">
                <div class="mt-2">{{ answer.updated_at.substr(0, 4) }}/{{ answer.updated_at.substr(5, 2) }}/{{ answer.updated_at.substr(8, 2) }}</div>
              </div>
              <div class="col-6 text-right">
                <button v-if="$store.state.user.id == answer.user_id && $store.state.user.id != 0" class="btn btn-secondary p-1 p-md-2 mr-2" @click="editAnswer(answer)"><i class="fas fa-edit mr-1"></i>編集</button>
                <LikeButton :question="answer" :is-my-page="false" :isQuestionDetails="false" :isAnswer="true"></LikeButton>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <CreateAnswer :question="$store.state.questionDetails" :updateAnswerFlag="data.updateAnswerFlag" @editAnswerCancel="editAnswerCancel()" v-bind:class="data.fixedAnswer"></CreateAnswer>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

import LikeButton from "./LikeButton.vue";
import CreateAnswer from "./CreateAnswer.vue";
import Markdown from "vue3-markdown-it";

export default {
  name: "Question",
  components: {
    LikeButton,
    Markdown,
    CreateAnswer,
  },
  props: {
    tagList: Boolean,
  },
  setup(props, context) {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    const data = reactive({
      fixedAnswer: {
        "fixed-bottom": false,
        "shadow-lg": false,
        "mb-0": false,
        "width-mobile": false,
      },
      answerArea: {
        "answer-area-mb": false,
      },
      updateAnswerFlag: false,
    });

    // QuestionDetailコンポーネントをロードした時に質問詳細を取得
    onMounted(() => {
      context.emit("showTagList", props.tagList);
      store.dispatch("getQuestionDetails", route.params.id);
      store.dispatch("getAnswers", route.params.id);
    });

    function editAnswer(answer) {
      store.commit("setAnswer", answer);
      data.fixedAnswer["fixed-bottom"] = true;
      data.fixedAnswer["shadow-lg"] = true;
      data.fixedAnswer["mb-0"] = true;
      data.fixedAnswer["width-mobile"] = true;
      data.answerArea["answer-area-mb"] = true;
      data.updateAnswerFlag = true;
    }

    function editAnswerCancel() {
      store.dispatch("getQuestionDetails", route.params.id);
      store.dispatch("getAnswers", route.params.id);
      store.commit("resetNewAnswer");
      data.fixedAnswer["fixed-bottom"] = false;
      data.fixedAnswer["shadow-lg"] = false;
      data.fixedAnswer["width-mobile"] = false;
      data.answerArea["answer-area-mb"] = false;
      data.updateAnswerFlag = false;
    }

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
              store.dispatch("getQuestionDetails", route.params.id);
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
      editAnswer,
      editAnswerCancel,
    };
  },
};
</script>

<style scoped>
.answer-area-mb {
  margin-bottom: 40rem;
}
.answer-card {
  border-color: var(--emphasis-color);
}
@media screen and (max-width: 959px) {
  /* 959px以下に適用されるCSS（タブレット用） */
}
@media screen and (max-width: 480px) {
  /* 480px以下に適用されるCSS（スマホ用） */
  .width-mobile {
    width: 90%;
  }
}
</style>
