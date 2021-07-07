<template>
  <header>
    <div class="container-fluid">
      <div class="row">
        <div class="col-6">
          <div class="p-2">
            <h1 class="m-0">Connect</h1>
            <h2 class="m-0">会津大学の知恵袋</h2>
          </div>
        </div>
        <div class="col-4 d-flex align-items-center justify-content-end">
          <p class="m-0">{{ $store.state.user.name }}</p>
        </div>
        <div class="col-2 d-flex align-items-center justify-content-center">
          <div class="dropdown dropleft">
            <button class="btn btn-secondary btn-lg" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-bars"></i></button>
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

@media screen and (max-width: 959px) {
  /* 959px以下に適用されるCSS（タブレット用） */
}
@media screen and (max-width: 480px) {
  /* 480px以下に適用されるCSS（スマホ用） */
  h1 {
    font-size: 1.4rem;
  }
  h2 {
    font-size: 0.7rem;
  }
  .h1-br {
    display: block;
  }
}
</style>
