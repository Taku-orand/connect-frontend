<template>
  <!-- <h2 class="text-center"><i class="fas fa-tags mr-2"></i>タグ</h2> -->
  <ul class="list-group overflow-auto">
    <li v-for="(tag, key) in $store.state.tags" :key="key" @click="getQuestionByTag(tag.id)" class="list-group-item"><i class="fas fa-tag mr-2"></i>{{ tag.name }}</li>
  </ul>
</template>

<script>
import { reactive, onMounted } from "vue";
// import axios from "axios";
// import { useRoute } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";

export default {
  name: "TagList",
  props: {},
  setup() {
    // const router = useRouter();
    // const route = useRoute();
    const store = useStore();

    const data = reactive({});

    // Tagコンポーネントをロードした時にタグを取得
    onMounted(() => {
      store.dispatch("getTags");
    });

    function getQuestionByTag(id) {
      axios
        .get(`${process.env.VUE_APP_CONNECT_BACKEND_URL}/tags/${id}`, { withCredentials: true })
        .then((response) => {
          if (response.data.get_question) {
            store.dispatch("setQuestions", response.data.questions);
          } else {
            store.commit("setAlert", {
              flag: {
                showSuccessAlert: false,
                showErrorAlert: true,
              },
              message: {
                error: "タグ絞り込みに失敗しました。",
              },
            });
          }
        })
        .catch(() => {});
    }

    return {
      data,
      getQuestionByTag,
    };
  },
};
</script>

<style scoped></style>
