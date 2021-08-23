<template>
  <div class="container">
    <template v-if="!isMyPage">
      <div class="row sticky mt-4">
        <div class="col-2 pr-1 pr-md-3">
          <div class="dropdown h-100">
            <button type="button" class="btn btn-secondary shadow w-100 h-100 tag-list-btn" data-toggle="modal" data-target="#selectTagModal"><i class="fas fa-tags"></i><span class="ml-2 tag-list-title">タグ一覧</span></button>
            <!-- <button class="btn btn-secondary shadow w-100 h-100 tag-list-btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-tags"></i><span class="ml-2 tag-list-title">タグ一覧</span></button>
            <div class="dropdown-menu p-0" aria-labelledby="dropdownMenuButton">
              <TagList></TagList>
            </div> -->
          </div>
        </div>
        <div class="col-10 pl-1 pl-md-3">
          <Search></Search>
        </div>
      </div>
    </template>

    <!-- タグ選択モーダル -->
    <div class="modal fade" id="selectTagModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">タグで質問を絞り込む</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <template v-for="(tag, key) in $store.state.tags" :key="key">
              <button @click="getQuestionByTag(tag.id)" class="btn btn-secondary mr-2 mb-2" data-dismiss="modal"><i class="fas fa-tag mr-1"></i>{{ tag.name }}</button>
            </template>
          </div>
        </div>
      </div>
    </div>

    <h2 class="text-center"><i class="fas fa-list mr-2"></i>質問一覧</h2>

    <div class="row">
      <div class="col-2 pr-0 mb-2 mb-md-3">
        <p class="m-0 questions-count">{{ $store.state.questions.length }}件</p>
      </div>
      <div class="col-6 p-0 mb-2 mb-md-3 text-center">
        <button @click="sort('all')" class="btn btn-primary p-1 p-md-2 mr-1">すべて</button>
        <button @click="sort('solved')" class="btn btn-primary p-1 p-md-2 mr-1">解決済</button>
        <button @click="sort('unsolved')" class="btn btn-primary p-1 p-md-2 mr-1">未解決</button>
      </div>
      <div class="col-4 mb-2 mb-md-3 text-right">
        <div class="dropdown dropleft">
          <button class="btn btn-primary p-1 p-md-2" type="button" id="dropdownSortButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-sort mr-1"></i>並べ替え</button>
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
      <div @click="showDetail(question)" class="card mb-2 mb-md-4">
        <div class="card-header">
          <div class="row">
            <div class="col-4">
              <p v-if="question.anonymous" class="m-0"><i class="fas fa-user mr-2"></i>匿名</p>
              <p v-else class="m-0"><i class="fas fa-user mr-2"></i>{{ question.user_name }}</p>
            </div>
            <div class="col-8 text-right">
              <span v-for="(tag, key) in question.tags" :key="key" class="badge badge-primary p-1 p-md-2 ml-1 ml-md-2 mb-1 mb-md-2">{{ tag.name }}</span>
              <span v-if="question.solved" class="badge badge-secondary p-1 p-md-2 ml-1 ml-md-2"><i class="fas fa-check-circle mr-1"></i>解決済</span>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <h5 class="m-0">{{ question.title }}</h5>
            </div>
          </div>
        </div>
        <div class="card-body overflow-hidden">
          <Markdown :source="String(question.content)" :linkify="true" :emoji="data.emoji" :breaks="data.breaks" />
        </div>
        <div class="card-footer text-muted">
          <div class="row">
            <div class="col-6 pr-0">
              <p class="m-0">{{ question.updated_at.substr(0, 4) }}/{{ question.updated_at.substr(5, 2) }}/{{ question.updated_at.substr(8, 2) }}</p>
            </div>
            <div class="col-6 pl-0 text-right">
              <button @click.stop="updateQuestion(question)" v-if="$store.state.user.id == question.user_id && !question.solved && $store.state.user.id != 0" class="btn btn-secondary p-1 p-md-2 mr-2"><i class="fas fa-edit mr-1"></i>編集</button>
              <LikeButton :question="question" :is-my-page="isMyPage" :isQuestionDetails="false" :isAnswer="false"></LikeButton>
            </div>
          </div>
        </div>
      </div>
    </template>
    <button v-if="!isMyPage" @click="goCreateQuestion" class="btn btn-lg btn-info shadow p-3 create-question-btn" type="button"><i class="fas fa-question mr-2"></i>質問する</button>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

// import TagList from "./TagList.vue";
import LikeButton from "./LikeButton.vue";
import Markdown from "vue3-markdown-it";
import Search from "./Search.vue";

export default {
  name: "QuestionList",

  components: {
    // TagList,
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
      store.dispatch("getTags");
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
      if (store.state.user.id == 0) {
        store.commit("setAlert", {
          flag: {
            showSuccessAlert: false,
            showErrorAlert: false,
            showWarningAlert: true,
          },
          message: {
            warning: "ゲストユーザーで投稿すると、あとで投稿を確認したり、編集ができなくなります。\nサインアップまたはサインインしていただくことでマイページより自分の質問を確認したり、質問を修正したりできるようになります。",
          },
        });
      }
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

    function getQuestionByTag(id) {
      axios
        .get(`${process.env.VUE_APP_CONNECT_BACKEND_URL}/tag/${id}`, { withCredentials: true })
        .then((response) => {
          if (response.data.get_question) {
            store.commit("setQuestions", response.data.questions);
          } else {
            store.commit("setAlert", {
              flag: {
                showSuccessAlert: false,
                showErrorAlert: true,
                showWarningAlert: false,
              },
              message: {
                error: "タグ絞り込みに失敗しました。",
              },
            });
          }
        })
        .catch((e) => {
          alert(e);
        });
    }

    return {
      data,
      showDetail,
      updateQuestion,
      goCreateQuestion,
      sort,
      getQuestionByTag,
    };
  },
};
</script>

<style scoped>
.sticky {
  position: sticky;
  top: 1.5rem;
  z-index: 999;
}
.questions-count {
  font-size: 1.5rem;
}
.card {
  cursor: pointer;
}
.card-body {
  height: 15rem;
}
.create-question-btn {
  position: fixed;
  right: 3rem;
  bottom: 3rem;
}
@media screen and (max-width: 959px) {
  /* 959px以下に適用されるCSS（タブレット用） */
  .tag-list-title {
    display: none;
  }
}
@media screen and (max-width: 576px) {
  /* 576px以下に適用されるCSS（スマホ用） */
  .tag-list-btn {
    font-size: 0.6rem;
  }
  .questions-count {
    font-size: 0.9rem;
  }
  .card-body {
    height: 8rem;
  }
  .create-question-btn {
    width: 50%;
    font-size: 1.2rem;
    right: 1rem;
    bottom: 1rem;
  }
}
</style>
