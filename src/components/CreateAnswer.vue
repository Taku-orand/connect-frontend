<template>
  <div class="container">
    <h2 class="text-center m-4">回答投稿</h2>
    <Form></Form>
    <div class="text-right">
      <button @click="createAnswer()" class="btn btn-primary btn-lg mb-5">回答投稿</button>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useStore } from "vuex";
// import { useRouter } from "vue-router";
import axios from "axios";
import Form from "./Form.vue";

export default {
  components: {
    Form,
  },
  props: {},
  setup() {
    // const router = useRouter();
    const store = useStore();

    onMounted(() => {});

    async function createAnswer() {
      await axios
        .post(
          `${process.env.VUE_APP_CONNECT_BACKEND_URL}/answers/create`,
          {
            question: {
              title: store.state.questionDetails.title,
              content: store.state.questionDetails.content,
              anonymous: store.state.questionDetails.anonymous,
              solved: 0,
              tag_ids: store.state.selected_tags_id,
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
