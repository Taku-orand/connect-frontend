import { createStore } from "vuex";
import axios from "axios";

export const store = createStore({
  // Store で管理するデータ項目の定義
  // デフォルト値
  state() {
    return {
      // ユーザー
      user: {
        name: "ゲストユーザー",
      },

      // アラート
      alert: {
        flag: {
          showSuccessAlert: false,
          showErrorAlert: false,
        },
        message: {
          success: "",
          error: "",
        },
      },

      // 質問
      questions: {},

      // 質問詳細
      questionDetails: {},

      // 回答
      answers: {},

      // タグ
      tags: {},
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
      state.user.name = "ゲストユーザー";
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
        },
        message: {
          success: "",
          error: "",
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

    setAnswers: (state, answers) => {
      state.answers = answers;
    },

    // タグ
    setTags: (state, tags) => {
      state.tags = tags;
    },
  },

  // mutations の操作を各コンポーネントから呼び出すために使用する関数（非同期処理を定義可）
  actions: {
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

    getMyQuestions: async function(context) {
      await axios
        .get(`${process.env.VUE_APP_CONNECT_BACKEND_URL}/questions/user`, { withCredentials: true })
        .then((response) => {
          console.log(response);
          if (response.data.get_my_questions) {
            context.commit("setQuestions", response.data.questions);
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

    getQuestions: async function(context) {
      await axios
        .get(`${process.env.VUE_APP_CONNECT_BACKEND_URL}/questions/index`, { withCredentials: true })
        .then((response) => {
          console.log(response);
          context.commit("setQuestions", response.data.questions);
        })
        .catch((e) => {
          alert(e);
        });
    },

    getQuestionDetails: async function(context, id) {
      await axios
        .get(`${process.env.VUE_APP_CONNECT_BACKEND_URL}/questions/show/${id}`, { withCredentials: true })
        .then((response) => {
          context.commit("setQuestionDetails", response.data);
        })
        .catch((e) => {
          alert(e);
        });
    },

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
  },
});
