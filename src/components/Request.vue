<template>
  <div class="container">
    <h2 class="text-center m-4"><i class="fas fa-lightbulb mr-2"></i>意見ボックス</h2>
    <p>ご利用いただきありがとうございます。<br />バグの報告や追加して欲しい新しい機能などなんでも投稿してください。<br />運営の参考にさせていただきます。</p>
    <div class="form-group">
      <input v-model="data.request.title" type="text" class="form-control" id="title" placeholder="タイトルを入力してください。" />
    </div>
    <div class="form-group">
      <textarea v-model="data.request.content" class="form-control" id="content" rows="10" placeholder="内容を入力してください。"></textarea>
    </div>
    <div class="text-right">
      <button @click="postRequest()" class="btn btn-primary mb-3 mb-md-5"><i class="fas fa-reply mr-2"></i>意見を投稿</button>
    </div>

    <div class="mb-3 mb-md-5">
      <h2 class="text-center m-4"><i class="fas fa-lightbulb mr-2"></i>今までの投稿</h2>
      <template v-for="(request, key) in $store.state.requests" :key="key">
        <div class="card mb-2 mb-md-4">
          <div class="card-body">
            <h5>{{ request.title }}</h5>
            <p>{{ request.content }}</p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
import axios from "axios";
// import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  components: {},
  props: {},
  setup() {
    // const router = useRouter();
    // const route = useRoute();
    const store = useStore();

    onMounted(() => {
      store.dispatch("getRequests");
    });

    const data = reactive({
      request: {
        title: "",
        content: "",
      },
      isPosting: false,
    });

    function beginPost() {
      data.isPosting = true;
    }

    function endPost() {
      data.isPosting = false;
    }

    function postRequest() {
      if (data.request.title == "" || data.request.content == "") {
        store.commit("setAlert", {
          flag: {
            showSuccessAlert: false,
            showErrorAlert: true,
            showWarningAlert: false,
          },
          message: {
            error: "タイトル、内容を入力してから投稿してください。",
          },
        });
      } else {
        if (!data.isPosting) {
          beginPost();
          axios
            .post(
              `${process.env.VUE_APP_CONNECT_BACKEND_URL}/requests/create`,
              {
                request: {
                  title: data.request.title,
                  content: data.request.content,
                },
              },
              { withCredentials: true }
            )
            .then((response) => {
              if (response.data.created_request) {
                store.dispatch("getRequests");
                store.commit("setAlert", {
                  flag: {
                    showSuccessAlert: true,
                    showErrorAlert: false,
                    showWarningAlert: false,
                  },
                  message: {
                    success: "意見を投稿しました。",
                  },
                });
                data.request.title = "";
                data.request.content = "";
              } else {
                store.commit("setAlert", {
                  flag: {
                    showSuccessAlert: false,
                    showErrorAlert: true,
                    showWarningAlert: false,
                  },
                  message: {
                    error: "意見を投稿するのに失敗しました。もう一度試していださい。",
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

    return {
      data,
      beginPost,
      endPost,
      postRequest,
    };
  },
};
</script>

<style scoped>
@media screen and (max-width: 959px) {
  /* 959px以下に適用されるCSS（タブレット用） */
}
@media screen and (max-width: 576px) {
  /* 576px以下に適用されるCSS（スマホ用） */
}
</style>
