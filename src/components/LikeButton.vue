<template>
  <button @click.stop="addLike(question)" type="button" class="btn btn-primary">
    いいね <span class="badge badge-light">{{ question.like_count }}</span>
  </button>
</template>

<script>
import { reactive } from "vue";
import axios from "axios";
// import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "QuestionList",
  components: {},
  props: {
    question: Object,
    isMyPage: Boolean,
    isQuestionDetails: Boolean,
    isAnswer: Boolean,
  },
  setup(props) {
    // const router = useRouter();
    // const route = useRoute();
    const store = useStore();

    const data = reactive({});

    function addLike(question) {
      axios
        .post(`${process.env.VUE_APP_CONNECT_BACKEND_URL}/like/add/${props.question.like_id}`)
        .then((response) => {
          if (response.data.add_like) {
            if (props.isQuestionDetails) {
              store.commit("updateLike", {
                type: "details",
                id: question.id,
                like: response.data.like_count,
              });
            } else if (props.isAnswer) {
              store.commit("updateLike", {
                type: "answer",
                id: question.id,
                like: response.data.like_count,
              });
            } else {
              store.commit("updateLike", {
                type: "questions",
                id: question.id,
                like: response.data.like_count,
              });
            }
          } else {
            store.commit("setAlert", {
              flag: {
                showSuccessAlert: false,
                showErrorAlert: true,
              },
              message: {
                success: "いいねに失敗しました。",
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
      addLike,
    };
  },
};
</script>

<style scoped></style>
