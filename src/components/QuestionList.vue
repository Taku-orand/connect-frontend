<template>
  <div class="container">
    <h2 class="text-center"><i class="fas fa-list mr-2"></i>質問一覧</h2>
    <Search v-if="!isMyPage"></Search>

    <div class="row">
      <div class="col-2 pr-0 mb-3">
        <p class="m-0 questions-count">{{ $store.state.questions.length }}件</p>
      </div>
      <div class="col-6 p-0 mb-3 text-center">
        <button @click="sort('all')" class="btn btn-primary p-1 p-md-2 mr-1">すべて</button>
        <button @click="sort('solved')" class="btn btn-primary p-1 p-md-2 mr-1">解決済</button>
        <button @click="sort('unsolved')" class="btn btn-primary p-1 p-md-2 mr-1">未解決</button>
      </div>
      <div class="col-4 mb-3 text-right">
        <div class="dropdown dropleft">
          <button class="btn btn-primary dropdown-toggle p-1 p-md-2" type="button" id="dropdownSortButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">並べ替え</button>
          <div class="dropdown-menu" aria-labelledby="dropdownSortButton">
            <button @click="sort('new')" class="dropdown-item">新しい順</button>
            <button @click="sort('old')" class="dropdown-item">古い順</button>
            <button @click="sort('like')" class="dropdown-item">いいね多い順</button>
            <button @click="sort('unlike')" class="dropdown-item">いいね少ない順</button>
          </div>
        </div>
      </div>
    </div>

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
          <Markdown :source="String(question.content)" :linkify="true" :emoji="data.emoji" :breaks="data.breaks" />
        </div>
        <div class="card-footer text-muted">
          <div class="row">
            <div class="col-6 pr-0">
              <p class="m-0">{{ question.updated_at.substr(0, 4) }}/{{ question.updated_at.substr(5, 2) }}/{{ question.updated_at.substr(8, 2) }}</p>
            </div>
            <div class="col-6 pl-0 text-right">
              <button @click.stop="updateQuestion(question)" v-if="$store.state.user.id == question.user_id && !question.solved" class="btn btn-secondary p-1 p-md-2 mr-2"><i class="fas fa-edit mr-2"></i>編集</button>
              <LikeButton :question="question" :is-my-page="isMyPage" :isQuestionDetails="false" :isAnswer="false"></LikeButton>
            </div>
          </div>
        </div>
      </div>
    </template>
    <button v-if="!isMyPage" @click="goCreateQuestion" class="btn btn-info btn-lg fixed-bottom ml-auto shadow-lg p-md-3 mr-3 mb-3 mr-md-5 mb-md-5">質問する</button>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
// import axios from "axios";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import LikeButton from "./LikeButton.vue";
import Markdown from "vue3-markdown-it";
import Search from "./Search.vue";

export default {
  name: "QuestionList",

  components: {
    LikeButton,
    Markdown,
    Search,
  },
  props: {
    isMyPage: Boolean,
    tagList: Boolean,
  },
  setup(props, context) {
    const router = useRouter();
    // const route = useRoute();
    const store = useStore();

    const data = reactive({});

    // QuestionListコンポーネントをロードした時に質問を取得
    onMounted(() => {
      context.emit("showTagList", props.tagList);
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

    function sort(type) {
      switch (type) {
        case "all":
          store.dispatch("getQuestions");
          break;
        case "solved":
          store.dispatch("getSortedQuestions", "solved");
          break;
        case "unsolved":
          store.dispatch("getSortedQuestions", "unsolved");
          break;
        case "new":
          store.dispatch("getSortedQuestions", "date_desc");
          break;
        case "old":
          store.dispatch("getSortedQuestions", "date_asc");
          break;
        case "like":
          store.dispatch("getSortedQuestions", "like_desc");
          break;
        case "unlike":
          store.dispatch("getSortedQuestions", "like_asc");
          break;

        default:
          break;
      }
    }

    return {
      data,
      showDetail,
      updateQuestion,
      goCreateQuestion,
      sort,
    };
  },
};
</script>

<style scoped>
@media screen and (max-width: 959px) {
  /* 959px以下に適用されるCSS（タブレット用） */
}
@media screen and (max-width: 480px) {
  /* 480px以下に適用されるCSS（スマホ用） */
  .questions-count {
  }
}
</style>
