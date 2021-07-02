<template>
  <div class="container">
    <h2 class="text-center m-4">質問編集</h2>
    <Form></Form>
    <button @click="updateQuestion()" class="btn btn-primary m-3">修正</button>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import axios from "axios";
import Form from "./Form.vue";

export default {
  props: {},
  components: {
    Form,
  },
  setup() {
    const route = useRoute();
    const store = useStore();

    onMounted(() => {
      store.dispatch("getQuestionDetails", route.params.id);
    });

    async function updateQuestion() {
      await axios
        .patch(
          `${process.env.VUE_APP_CONNECT_BACKEND_URL}/questions/update/${route.params.id}`,
          {
            question: {
              title: store.state.questionDetails.title,
              content: store.state.questionDetails.content,
              anonymous: store.state.questionDetails.anonymous,
              solved: store.state.questionDetails.solved,
              tag_ids: store.state.post_tags_id,
            },
          },
          { withCredentials: true }
        )
        .then((response) => {
          console.log(response);
          if (response.data.posted) {
            store.commit("setAlert", {
              flag: {
                showSuccessAlert: true,
                showErrorAlert: false,
              },
              message: {
                success: "修正に成功しました。",
              },
            });
            route.push({
              name: "home",
            });
          } else {
            store.commit("setAlert", {
              flag: {
                showSuccessAlert: true,
                showErrorAlert: false,
              },
              message: {
                success: "修正に失敗しました。",
              },
            });
          }
        })
        .catch((e) => {
          alert(e);
        });
    }
    return {
      updateQuestion,
    };
  },
};
</script>
