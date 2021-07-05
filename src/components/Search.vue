<template>
  <div class="row">
    <div class="col-10">
      <div class="form-group">
        <input v-model="data.word" type="text" class="form-control" id="search" placeholder="検索..." />
      </div>
    </div>
    <div class="col-2">
      <button v-on:click="search" class="btn btn-primary w-100"><i class="fa fa-search" aria-hidden="true"></i></button>
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
            store.commit("setQuestions",response.data.questions);
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
