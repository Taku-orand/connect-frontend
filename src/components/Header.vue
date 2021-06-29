<template>
  <header>
    <div class="row">
      <div class="col-8">
        <h1 class="p-2">Connect</h1>
      </div>
      <div class="col-2 d-flex align-items-center justify-content-end">
        <div>{{ $store.state.user.name }}</div>
      </div>
      <div class="col-2 d-flex align-items-center justify-content-center">
        <div class="dropdown text-center">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">メニュー</button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <router-link @click="$store.commit('resetAlert')" class="dropdown-item" to="/my_page">マイページ</router-link>
            <router-link @click="$store.commit('resetAlert')" class="dropdown-item" to="/question/list">質問一覧</router-link>
            <router-link @click="$store.commit('resetAlert')" class="dropdown-item" to="/signup">サインアップ</router-link>
            <router-link @click="$store.commit('resetAlert')" class="dropdown-item" to="/signin">サインイン</router-link>
            <button @click="signOut" class="dropdown-item">サインアウト</button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { reactive } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "Header",
  props: {
    user: Object,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const data = reactive({
      user_id: route.query.user_id,
      email: "",
      password: "",
    });

    function signOut() {
      axios
        .delete(`${process.env.VUE_APP_CONNECT_BACKEND_URL}/signout`, { withCredentials: true })
        .then((response) => {
          store.dispatch("checkSignedIn");
          if (response.data.signed_out) {
            store.commit("setAlert", {
              flag: {
                showSuccessAlert: true,
                showErrorAlert: false,
              },
              message: {
                success: "ログアウトしました。",
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
                error: "ログアウトに失敗しました。もう一度行ってください。",
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
      signOut,
    };
  },
};
</script>

<style scoped>
header {
  background-color: var(--main-color);
}
</style>
