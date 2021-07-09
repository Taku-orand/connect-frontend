<template>
  <div class="row m-0">
    <div class="col-10 pr-1 pr-md-3 pl-0">
      <div class="form-group m-0">
        <input v-model="data.word" type="text" class="form-control shadow" id="search" placeholder="検索..." />
      </div>
    </div>
    <div class="col-2 pl-1 pl-md-3 pr-0">
      <button v-on:click="search" class="btn btn-primary w-100 h-100 shadow search-btn"><i class="fa fa-search" aria-hidden="true"></i><span class="ml-2 search-btn-title">検索</span></button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { reactive } from "vue";
import { useStore } from "vuex";

export default {
  components: {},
  setup() {
    const store = useStore();
    const data = reactive({
      word: "",
    });
    async function search() {
      await axios
        .get(`${process.env.VUE_APP_CONNECT_BACKEND_URL}/search/?word=${data.word}`, { withCredentials: true })
        .then((response) => {
          console.log(response);
          if (response.data.searched_by_word) {
            store.commit("setQuestions", response.data.questions);
            store.commit("setAlert", {
              flag: {
                showSuccessAlert: true,
                showErrorAlert: false,
              },
              message: {
                success: `${response.data.questions.length}件みつかりました。`,
              },
            });
          } else {
            store.commit("setAlert", {
              flag: {
                showSuccessAlert: false,
                showErrorAlert: true,
              },
              message: {
                error: `検索ワード"${data.word}"がみつかりませんでした`,
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
      search,
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
  .search-btn {
    font-size: 0.6rem;
  }
  .search-btn-title {
    display: none;
  }
}
</style>
