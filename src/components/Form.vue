<template>
  <div class="form-group m-1">
    <div>{{ $store.state.user.email }}</div>
    <input placeholder="タイトル" id="title" v-model="data.title" /> <br />
    <textarea placeholder="内容" id="content" v-model="data.content"></textarea>
    <button @click="postq()" class="btn btn-primary m-3">投稿</button>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { reactive } from "vue";
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

    async function postq() {
      await axios
        .post(
          `${process.env.VUE_APP_CONNECT_BACKEND_URL}/questions/create`,
          {
            question: {
              title: data.title,
              content: data.content,
              anonymous: data.anonymous,
              solved: false,
              like: 0
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
                success: "投稿に成功しました。",
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
      data,
      postq,
    };
  },
};
</script>
