<template>
  <div class="container">
    <h2 class="text-center m-4"><i class="fas fa-comment-dots mr-2"></i>回答投稿</h2>
    <Form :isAnswer="true"></Form>
    <div class="text-right">
      <button @click="createAnswer()" class="btn btn-primary btn-lg mb-5">回答投稿</button>
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
  },
  setup(props) {
    // const router = useRouter();
    const route = useRoute();
    const store = useStore();

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
    return {
      createAnswer,
    };
  },
};
</script>
