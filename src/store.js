import { createStore } from "vuex";
import axios from "axios";

export const store = createStore({
  // Store で管理するデータ項目の定義
  // デフォルト値
  state() {
    return {
      // ユーザー
      user: {
        id: 0,
        name: "ゲスト",
      },

      likeSum: 0,

      // アラート
      alert: {
        flag: {
          showSuccessAlert: false,
          showErrorAlert: false,
          showWarningAlert: false,
        },
        message: {
          success: "",
          error: "",
          warning: "",
        },
      },

      // 質問一覧
      questions: {},
      // 質問詳細
      questionDetails: {},

      // 回答一覧
      answers: {},
      // 投稿する回答
      newAnswer: {},

      // タグ
      tags: {},
      // 選択されたタグ
      selected_tags_id: [],

      // 意見一覧
      requests: {},
    };
  },

  // state 内のデータの状態から算出される値
  getters: {},

  // state のデータを直接操作するための関数（非同期処理は定義不可）
  mutations: {
    // ユーザー
    updateUser: (state, user) => {
      state.user = user;
    },
    resetUser: (state) => {
      state.user.name = "ゲスト";
    },

    setLikeSum: (state, likeSum) => {
      state.likeSum = likeSum;
    },

    // アラート
    setAlert: (state, alert) => {
      state.alert = alert;
    },

    resetAlert: (state) => {
      state.alert = {
        flag: {
          showSuccessAlert: false,
          showErrorAlert: false,
          showWarningAlert: false,
        },
        message: {
          success: "",
          error: "",
          warning: "",
        },
      };
    },

    // 質問
    setQuestions: (state, questions) => {
      state.questions = questions;
    },

    // 質問詳細
    setQuestionDetails: (state, questionDetails) => {
      state.questionDetails = questionDetails;
    },
    resetQuestionDetails: (state) => {
      state.questionDetails = {};
      state.questionDetails.title = "";
      state.questionDetails.content = "";
    },

    // 回答
    setAnswers: (state, answers) => {
      state.answers = answers;
    },
    // 回答投稿
    resetNewAnswer: (state) => {
      state.newAnswer.content = "";
      state.newAnswer.anonymous = false;
    },

    setAnswer: (state, answer) => {
      state.newAnswer = answer;
    },

    // like更新
    updateLike: (state, { type, id, like }) => {
      if (type == "questions") {
        state.questions.forEach((question) => {
          if (question.id == id) {
            question.like_count = like;
          }
        });
      }
      if (type == "details") {
        state.questionDetails.like_count = like;
      }
      if (type == "answer") {
        state.answers.forEach((answer) => {
          if (answer.id == id) {
            answer.like_count = like;
          }
        });
      }
    },

    // タグ
    setTags: (state, tags) => {
      state.tags = tags;
    },
    addTagId: (state, id) => {
      state.selected_tags_id.push(id);
    },
    removeTagId: (state, id) => {
      state.selected_tags_id.splice(state.selected_tags_id.indexOf(id), 1);
    },
    resetTagId: (state) => {
      state.selected_tags_id = [];
    },

    // 意見
    setRequest: (state, requests) => {
      state.requests = requests;
    },
  },

  // mutations の操作を各コンポーネントから呼び出すために使用する関数（非同期処理を定義可）
  actions: {
    // サインインしいるか確認します。
    checkSignedIn: async function(context) {
      await axios
        .get(`${process.env.VUE_APP_CONNECT_BACKEND_URL}/signed_in`, { withCredentials: true })
        .then((response) => {
          if (response.data.signed_in) {
            context.commit("updateUser", response.data.user);
          } else {
            context.commit("resetUser");
          }
        })
        .catch((e) => {
          alert(e);
        });
    },

    // マイページで利用する今までの自分の質問を取得します。
    getMyQuestions: async function(context) {
      await axios
        .get(`${process.env.VUE_APP_CONNECT_BACKEND_URL}/questions/user`, { withCredentials: true })
        .then((response) => {
          if (response.data.get_my_questions) {
            context.commit("setQuestions", response.data.questions);
            let likeSum = 0;
            store.state.questions.forEach((question) => {
              likeSum += question.like_count;
            });
            context.commit("setLikeSum", likeSum);
          } else {
            store.commit("setAlert", {
              flag: {
                showSuccessAlert: false,
                showErrorAlert: true,
              },
              message: {
                error: "自分の質問を取得できませんでした。",
              },
            });
          }
        })
        .catch((e) => {
          alert(e);
        });
    },

    // 全ての質問を取得します。
    getQuestions: async function(context) {
      await axios
        .get(`${process.env.VUE_APP_CONNECT_BACKEND_URL}/questions/index`, { withCredentials: true })
        .then((response) => {
          context.commit("setQuestions", response.data.questions);
        })
        .catch((e) => {
          alert(e);
        });
    },

    // 並び替えられた質問を取得します。
    getSortedQuestions: async function(context, type) {
      await axios
        .get(`${process.env.VUE_APP_CONNECT_BACKEND_URL}/sort/${type}`, { withCredentials: true })
        .then((response) => {
          context.commit("setQuestions", response.data.questions);
        })
        .catch((e) => {
          alert(e);
        });
    },

    // 一つの質問の詳細を取得します。
    getQuestionDetails: async function(context, id) {
      await axios
        .get(`${process.env.VUE_APP_CONNECT_BACKEND_URL}/questions/show/${id}`, { withCredentials: true })
        .then((response) => {
          context.commit("setQuestionDetails", response.data.question);
        })
        .catch((e) => {
          alert(e);
        });
    },

    // 質問に対する回答を全て取得します。
    getAnswers: async function(context, id) {
      await axios
        .get(`${process.env.VUE_APP_CONNECT_BACKEND_URL}/answers/show/${id}`, { withCredentials: true })
        .then((response) => {
          context.commit("setAnswers", response.data.answers);
        })
        .catch((e) => {
          alert(e);
        });
    },

    // 全てのタグを取得します。
    getTags: async function(context) {
      await axios
        .get(`${process.env.VUE_APP_CONNECT_BACKEND_URL}/tags/index`, { withCredentials: true })
        .then((response) => {
          context.commit("setTags", response.data.tags);
        })
        .catch((e) => {
          alert(e);
        });
    },

    getRequests: async function(context) {
      await axios
        .get(`${process.env.VUE_APP_CONNECT_BACKEND_URL}/requests/index`, { withCredentials: true })
        .then((response) => {
          context.commit("setRequest", response.data.requests);
        })
        .catch((e) => {
          alert(e);
        });
    },
  },
});
