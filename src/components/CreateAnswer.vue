<template>
  <div class="container p-0 mb-4">
    <div class="card">
      <div class="card-body py-0">
        <div v-if="updateAnswerFlag">
          <h2 class="text-center"><i class="fas fa-comment-dots mr-2"></i>回答編集</h2>
        </div>
        <div v-else>
          <h2 class="text-center"><i class="fas fa-comment-dots mr-2"></i>回答投稿</h2>
        </div>
        <Form :isAnswer="true" :updateAnswerFlag="updateAnswerFlag"></Form>
        <div class="row">
          <div class="col">
            <button v-if="updateAnswerFlag" class="btn btn-secondary" @click="editAnswerCancel()"><i class="fas fa-edit mr-2"></i>キャンセル</button>
          </div>
          <div class="col">
            <div class="text-right">
              <div v-if="updateAnswerFlag">
                <button @click="updateAnswer()" class="btn btn-primary mb-3">回答修正</button>
              </div>
              <div v-else>
                <button @click="createAnswer()" class="btn btn-primary mb-3"><i class="fas fa-reply mr-2"></i>回答投稿</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
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
    updateAnswerFlag: Boolean,
  },
  setup(props, context) {
    // const router = useRouter();
    const route = useRoute();
    const store = useStore();

    const data = reactive({
      isPosting: false,
    });

    function beginPost() {
      data.isPosting = true;
    }

    function endPost() {
      data.isPosting = false;
    }

    onMounted(() => {
      store.state.newAnswer.content = "";
    });

    async function createAnswer() {
      if (store.state.newAnswer.content == "") {
        store.commit("setAlert", {
          flag: {
            showSuccessAlert: false,
            showErrorAlert: true,
            showWarningAlert: false,
          },
          message: {
            error: "内容を入力してから投稿してください。",
          },
        });
      } else {
        if (!data.isPosting) {
          beginPost();
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
          endPost();
        }
      }
    }

    async function updateAnswer() {
      if (!data.isPosting) {
        beginPost();
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
              context.emit("editAnswerCancel");
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
        endPost();
      }
    }

    function editAnswerCancel() {
      context.emit("editAnswerCancel");
    }

    return {
      data,
      beginPost,
      endPost,
      createAnswer,
      updateAnswer,
      editAnswerCancel,
    };
  },
};
</script>

<style scoped>
@media screen and (max-width: 959px) {
  /* 959px以下に適用されるCSS（タブレット用） */
}
@media screen and (max-width: 480px) {
  /* 480px以下に適用されるCSS（スマホ用） */
}
</style>
