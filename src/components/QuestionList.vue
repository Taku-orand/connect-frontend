<template>
  <div class="container">
    <h2 class="text-center m-4">質問一覧</h2>
    <template v-for="(question, key) in $store.state.questions" :key="key">
      <div @click="showDetail(question)" class="card mb-4">
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
              <div class="mt-2">{{ question.updated_at.substr(0, 4) }}/{{ question.updated_at.substr(5, 2) }}/{{ question.updated_at.substr(8, 2) }}</div>
            </div>
            <div class="col-6 text-right">
              <button @click.stop="updateSolved(question)" v-if="$store.state.user.id == question.user_id" class="btn btn-success mr-2">解決した！</button>
              <button @click.stop="updateQuestion(question)" v-if="$store.state.user.id == question.user_id" class="btn btn-secondary mr-2">編集</button>
              <LikeButton :question="question" :is-my-page="false"></LikeButton>
            </div>
          </div>
        </div>
      </div>
    </template>
    <button v-if="!isMyPage" @click="goCreateQuestion" class="btn btn-info btn-lg fixed-bottom ml-auto m-5">質問する</button>
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
      store.commit("resetAlert");
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

    function updateSolved() {
      axios
        .post(`${process.env.VUE_APP_CONNECT_BACKEND_URL}/like/add/${props.question.like_id}`)
        .then((response) => {
          if (response.data.add_like) {
            if (props.isMyPage) {
              store.dispatch("getQuestionDetails");
            } else {
              store.dispatch("getQuestions");
              if (route.params.id) {
                store.dispatch("getQuestionDetails", route.params.id);
              }
            }
            // 質問を更新、マイページなのかに注意
          } else {
            store.commit("setAlert", {
              flag: {
                showSuccessAlert: false,
                showErrorAlert: true,
              },
              message: {
                success: "いいねに失敗しました。",
              },
            });
          }
        })
        .catch((e) => {
          alert(e);
        });
    }

    function updateQuestion(question) {
      store.commit("resetAlert");
      router.push({
        path: `/question/update/${question.id}`,
      });
    }

    function goCreateQuestion() {
      store.commit("resetAlert");
      store.commit("resetQuestionDetails");
      router.push({
        name: "post",
      });
    }

    return {
      data,
      showDetail,
      updateSolved,
      updateQuestion,
      goCreateQuestion,
    };
  },
};
</script>

<style scoped></style>
