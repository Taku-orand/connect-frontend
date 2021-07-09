<template>
  <div class="container">
    <h2 class="text-center"><i class="fas fa-comment-dots mr-2"></i>回答投稿</h2>
    <Form :isAnswer="true"></Form>
    <div class="text-right">
      <div v-if="updateButton">
        <button @click="updateAnswer()" class="btn btn-primary btn-lg mb-5">回答修正</button>
      </div>
      <div v-else>
        <button @click="createAnswer()" class="btn btn-primary btn-lg mb-5">回答投稿</button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import axios from "axios";
import Form from "./Form.vue";

export default {
  components: {
    Form,
  },
  props: {
    question: Object,
    updateButton: Boolean,
  },
  setup(props, context) {
    // const router = useRouter();
    const route = useRoute();
    const store = useStore();
    console.log(context);
    onMounted(() => {
      store.state.newAnswer.content = "";
    });

    async function createAnswer() {
      await axios
        .post(
          `${process.env.VUE_APP_CONNECT_BACKEND_URL}/answers/create`,
          {
            answer: {
              content: store.state.newAnswer.content,
              anonymous: store.state.newAnswer.anonymous,
              question_id: props.question.id,
            },
          },
          { withCredentials: true }
        )
        .then((response) => {
          console.log(response);
          if (response.data.created_answer) {
            store.commit("setAlert", {
              flag: {
                showSuccessAlert: true,
                showErrorAlert: false,
              },
              message: {
                success: "投稿に成功しました",
              },
            });
            store.dispatch("getQuestionDetails", route.params.id);
            store.dispatch("getAnswers", route.params.id);
            store.commit("resetNewAnswer");
          } else {
            store.commit("setAlert", {
              flag: {
                showSuccessAlert: false,
                showErrorAlert: true,
              },
              message: {
                error: "投稿に失敗しました。",
              },
            });
          }
        })
        .catch((e) => {
          alert(e);
        });
    }
    async function updateAnswer() {
      await axios
        .patch(
          `${process.env.VUE_APP_CONNECT_BACKEND_URL}/answers/update/${store.state.newAnswer.id}`,
          {
            answer: {
              content: store.state.newAnswer.content,
              anonymous: store.state.newAnswer.anonymous,
            },
          },
          { withCredentials: true }
        )
        .then((response) => {
          console.log(response);
          if (response.data.updated_answer) {
            store.dispatch("getQuestionDetails", route.params.id);
            store.dispatch("getAnswers", route.params.id);
            context.emit("editCancel");
            store.commit("setAlert", {
              flag: {
                showSuccessAlert: true,
                showErrorAlert: false,
              },
              message: {
                success: "編集に成功しました",
              },
            });
          } else {
            store.commit("setAlert", {
              flag: {
                showSuccessAlert: false,
                showErrorAlert: true,
              },
              message: {
                error: "編集に失敗しました。",
              },
            });
          }
        })
        .catch((e) => {
          alert(e);
        });
    }

    return {
      createAnswer,
      updateAnswer,
    };
  },
};
</script>
