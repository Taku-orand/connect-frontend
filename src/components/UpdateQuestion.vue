<template>
  <div class="container">
    <h2 class="text-center m-4">質問編集</h2>
    <Form :isAnswer="false"></Form>
    <div class="text-right">
      <button @click="updateQuestion()" class="btn btn-primary mb-3 mb-md-5">質問修正</button>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";
import axios from "axios";
import Form from "./Form.vue";

export default {
  components: {
    Form,
  },
  props: {
    tagList: Boolean,
  },
  setup(props, context) {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    onMounted(() => {
      context.emit("showTagList", props.tagList);
      store.dispatch("getQuestionDetails", route.params.id);
      store.dispatch("getAnswer");
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
          if (response.data.update_question) {
            store.commit("setAlert", {
              flag: {
                showSuccessAlert: true,
                showErrorAlert: false,
              },
              message: {
                success: "修正に成功しました。",
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
                error: "修正に失敗しました。",
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
