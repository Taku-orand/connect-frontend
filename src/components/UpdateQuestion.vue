<template>
  <Form></Form>
     <button @click="updateQuestion()" class="btn btn-primary m-3">修正</button>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { reactive, onMounted } from "vue";
import  axios  from "axios";

export default {
  props: {},
  setup() {
    const router = useRouter();
    const store = useStore();
    const data = reactive({
      title: "",
      content: "",
      anonymous: false,
      solved: false,
      like: 0
    });

    onMounted(()=>{
      store.dispatch("getQuestionDetails");
    });

    async function updateQuestion(){
      await axios
        .post(
          `${process.env.VUE_APP_CONNECT_BACKEND_URL}/questions/update/${route.params.id}`,
          {
            question: {
              title: store.state.questionDetails.title,
              content: store.state.questionDetails.content,
              anonymous: store.state.questionDetails.anonymous,
              solved: store.state.questionDetails.solved
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
            router.push({
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
      data,
      updateQuestion
    };
  },
};
</script>