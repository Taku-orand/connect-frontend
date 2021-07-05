<template>
  <div class="text-center">
    <input v-model="data.word" placeholder="検索...">
    <button><i class="fa fa-search" aria-hidden="true" v-on:click="search"></i></button>
  </div> 
</template>

<script>
import axios from "axios"
import { reactive } from "vue"
import { useStore } from "vuex"

export default ({
  components: {
  },
  setup() {
    const store = useStore()
    const data = reactive({
      word: "",
    })
    async function search() {

      await axios
        .get(
          `${process.env.VUE_APP_CONNECT_BACKEND_URL}/search/?word=${data.word}`,
          { withCredentials: true }
        )
        .then((response) => {
          console.log(response);
          if (response.data.searched) {
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
    }
  },
})
</script>
