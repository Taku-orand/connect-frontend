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
    });

    function signin() {
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
    }

    function backToHome() {
      store.commit("resetAlert");
      router.push({
        name: "home",
      });
    }

    return {
      data,
      signin,
      backToHome,
    };
  },
};
</script>

<style scoped></style>
