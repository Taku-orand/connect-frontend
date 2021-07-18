<template>
  <div class="container">
    <h2 class="text-center"><i class="fas fa-user-plus mr-2"></i>サインアップ</h2>
    <div class="form-group">
      <label for="name"><i class="fas fa-user mr-2"></i>ユーザー名</label>
      <input v-model="data.name" type="text" class="form-control" id="name" aria-describedby="nameHelp" placeholder="ユーザー名を入力してください。" />
      <small id="nameHelp" class="form-text text-muted">質問や回答を投稿する際に表示されるユーザー名です。</small>
    </div>
    <div class="form-group">
      <label for="email"><i class="fas fa-envelope mr-2"></i>メールアドレス</label>
      <input v-model="data.email" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="メールアドレスを入力してください。" />
      <small id="emailHelp" class="form-text text-muted">あなたのメールアドレスを他の誰とも共有することはありません。</small>
    </div>
    <div class="form-group">
      <label for="password"><i class="fas fa-lock mr-2"></i>パスワード</label>
      <input v-model="data.password" type="password" class="form-control" id="password" aria-describedby="passwordHelp" placeholder="パスワードを入力してください。" />
      <small id="passwordHelp" class="form-text text-muted">パスワードは8文字以上入力してください。</small>
    </div>
    <div class="form-group">
      <label for="passwordConfirmation"><i class="fas fa-lock mr-2"></i>パスワードの確認</label>
      <input v-model="data.passwordConfirmation" type="password" class="form-control" id="passwordConfirmation" aria-describedby="passwordConfirmationHelp" placeholder="パスワードを確認のためもう一度入力してください。" />
      <small id="passwordConfirmationHelp" class="form-text text-muted">パスワードは8文字以上入力してください。</small>
    </div>
    <div class="text-center my-4">
      <button @click="backToHome" class="btn btn-secondary mr-3"><i class="fas fa-home mr-2"></i>ホームに戻る</button>
      <button @click="signup" class="btn btn-primary ml-3"><i class="fas fa-plus-square mr-2"></i>アカウント制作</button>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "Signup",
  props: {},
  setup() {
    const router = useRouter();
    // const route = useRoute();
    const store = useStore();

    const data = reactive({
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      error_messages: "",
    });

    async function signup() {
      await axios
        .post(
          `${process.env.VUE_APP_CONNECT_BACKEND_URL}/signup`,
          {
            user: {
            name: data.name,
            email: data.email,
            password: data.password,
            password_confirmation: data.passwordConfirmation,
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
            if(response.data.errors){
              if(response.data.errors.name){
                data.error_messages += response.data.errors.name+"。\n"
              }
              if(response.data.errors.password){
                data.error_messages += response.data.errors.password+"。\n"
              }
              if(response.data.errors.email){
                data.error_messages += response.data.errors.email+"。\n";
              }
              if(response.data.errors.password_confirmation){
                data.error_messages += response.data.errors.password_confirmation+"。\n";
              }
            }
            store.commit("setAlert", {
              flag: {
                showSuccessAlert: false,
                showErrorAlert: true,
              },
              message: {
                error: data.error_messages,
              },
            });
            data.error_messages = ""
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
