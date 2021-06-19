<template>
  <h2 class="text-center m-5">サインアップ</h2>
  <div class="form-group m-5">
    <label for="email">メールアドレス</label>
    <input v-model="data.email" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="メールアドレスを入力してください。" />
    <small id="emailHelp" class="form-text text-muted">あなたのメールアドレスを他の誰とも共有することはありません。</small>
  </div>
  <div class="form-group m-5">
    <label for="password">パスワード</label>
    <input v-model="data.password" type="password" class="form-control" id="password" aria-describedby="passwordHelp" placeholder="パスワードを入力してください。" />
    <small id="passwordHelp" class="form-text text-muted">パスワードは8文字以上入力してください。</small>
  </div>
  <div class="form-group m-5">
    <label for="passwordConfirmation">パスワードの確認</label>
    <input v-model="data.passwordConfirmation" type="password" class="form-control" id="passwordConfirmation" aria-describedby="passwordConfirmationHelp" placeholder="パスワードを確認のためもう一度入力してください。" />
    <small id="passwordConfirmationHelp" class="form-text text-muted">パスワードは8文字以上入力してください。</small>
  </div>
  <div class="text-center m-5">
    <button @click="backToHome" class="btn btn-secondary m-3">ホームに戻る</button>
    <button @click="signup" class="btn btn-primary m-3">アカウント制作</button>
  </div>
</template>

<script>
import { reactive } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  props: {},
  setup() {
    const router = useRouter();
    // const route = useRoute();
    const store = useStore();

    const data = reactive({
      email: "",
      password: "",
      passwordConfirmation: "",
    });

    async function signup() {
      await axios
        .post(
          `${process.env.VUE_APP_CONNECT_BACKEND_URL}/signup`,
          {
            user: {
              email: data.email,
              password: data.password,
              passwordConfirmation: data.passwordConfirmation,
            },
          },
          { withCredentials: true }
        )
        .then((response) => {
          if (response.data.signed_up) {
            store.dispatch("checkSignedIn");
            store.commit("setAlert", {
              flag: {
                showSuccessAlert: true,
                showErrorAlert: false,
              },
              message: {
                success: "サインアップに成功し、サインインしました。",
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
                error: "サインアップに失敗しました。既に登録されているメールアドレスか確認パスワードが間違っています。",
              },
            });
          }
        })
        .catch((e) => {
          alert(e);
        });
    }

    function backToHome() {
      store.commit("resetAlert");
      router.push({
        name: "home",
      });
    }

    return {
      data,
      signup,
      backToHome,
    };
  },
};
</script>

<style scoped></style>
