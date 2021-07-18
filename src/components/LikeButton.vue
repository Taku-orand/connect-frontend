<template>
  <button @click.stop="addLike(question)" type="button" :class="data.pushedLike" class="btn p-1 p-md-2"><i class="fas fa-thumbs-up mr-1" :class="data.rotateLogo"></i>{{ question.like_count }}</button>
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

    const data = reactive({
      pushedLike: {
        "pushed-like": false,
      },
      rotateLogo: {
        "role-log": false,
      },
    });

    function addLike(question) {
      data.pushedLike["pushed-like"] = true;
      data.rotateLogo["rotate-logo"] = true;
      setTimeout(() => {
        data.pushedLike["pushed-like"] = false;
        data.rotateLogo["rotate-logo"] = false;
      }, 2000);
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

<style scoped>
.btn {
  color: var(--base-color);
  background-color: var(--accent-color);
  border-color: var(--accent-color);
  transition: 1s;
}
.pushed-like {
  color: var(--accent-color);
  background-color: var(--base-color);
  border-color: var(--base-color);
}
.rotate-logo {
  color: var(--accent-color);
  transform: rotate(360deg);
  transition: 1s;
}
</style>
