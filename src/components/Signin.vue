<template>
  <div class="container">
    <h2 class="text-center"><i class="fas fa-sign-in-alt mr-2"></i>サインイン</h2>
    <div class="form-group">
      <label for="email"><i class="fas fa-envelope mr-2"></i>メールアドレス</label>
      <input v-model="data.email" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="メールアドレスを入力してください。" />
      <small id="emailHelp" class="form-text text-muted">あなたのメールアドレスを他の誰とも共有することはありません。</small>
    </div>
    <div class="form-group">
      <label for="password"><i class="fas fa-lock mr-2"></i>パスワード</label>
      <input v-model="data.password" type="password" class="form-control" id="password" placeholder="パスワードを入力してください。" />
    </div>
    <p class="warning-message">※現在iOSのgoogle chromeでのサインインで不具合が生じています。利用される際はSafariを利用するかPCでの利用を推奨しています。また、Webサイトを超えたトラッキングを許可していない場合にもサインインできない可能性があります。ご迷惑をおかけしますが、ご了承ください。</p>
    <div class="text-center my-4">
      <button @click="backToHome" class="btn btn-secondary mr-3"><i class="fas fa-home mr-2"></i>ホームに戻る</button>
      <button @click="signin" class="btn btn-primary ml-3"><i class="fas fa-sign-in-alt mr-2"></i>アカウント接続</button>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "Signin",
  props: {},
  setup() {
    const router = useRouter();
    // const route = useRoute();
    const store = useStore();

    const data = reactive({
      email: "",
      password: "",
      isPosting: false,
    });

    function beginPost() {
      data.isPosting = true;
    }

    function endPost() {
      data.isPosting = false;
    }

    function signin() {
      if (!data.isPosting) {
        beginPost();
        axios
          .post(
            `${process.env.VUE_APP_CONNECT_BACKEND_URL}/signin`,
            {
              user: {
                email: data.email,
                password: data.password,
              },
            },
            { withCredentials: true }
          )
          .then((response) => {
            console.log(response);
            if (response.data.signed_in) {
              store.dispatch("checkSignedIn");
              store.commit("setAlert", {
                flag: {
                  showSuccessAlert: true,
                  showErrorAlert: false,
                },
                message: {
                  success: "サインインに成功しました。",
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
                  error: "サインインに失敗しました。メールアドレスかパスワードが間違っています。",
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

    function backToHome() {
      store.commit("resetAlert");
      router.push({
        name: "home",
      });
    }

    return {
      data,
      beginPost,
      endPost,
      signin,
      backToHome,
    };
  },
};
</script>

<style scoped>
.warning-message {
  color: var(--emphasis-color);
}
</style>
