<template>
  <div class="container">
    <h2 class="text-center m-4">質問投稿</h2>
    <Form></Form>
    <button @click="createQuestion()" class="btn btn-primary">投稿</button>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";
import Form from "./Form.vue";

export default {
  components: {
    Form,
  },
  props: [],
  setup() {
    const router = useRouter();
    const store = useStore();

    async function createQuestion() {
      await axios
        .post(
          `${process.env.VUE_APP_CONNECT_BACKEND_URL}/questions/create`,
          {
            question: {
              title: store.state.questionDetails.title,
              content: store.state.questionDetails.content,
              anonymous: store.state.questionDetails.anonymous,
              solved: 0,
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
                success: "投稿に成功しました",
              },
            });
            router.push({
              name: "home",
            });
          } else {
            store.commit("setAlert", {
              flag: {
                showSuccessAlert: false,
                showErrorAlert: true,
              },
              message: {
                success: "投稿に失敗しました。",
              },
            });
          }
        })
        .catch((e) => {
          alert(e);
        });
    }
    return {
      createQuestion,
    };
  },
};
</script>
