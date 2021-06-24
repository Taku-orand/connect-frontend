<template>
  <router-view></router-view>
</template>

<script>
import { reactive, onMounted } from "vue";
// import axios from "axios";
// import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "Question",
  components: {},
  props: {},
  setup() {
    // const router = useRouter();
    // const route = useRoute();
    const store = useStore();

    const data = reactive({});

    // Questionコンポーネントをロードした時に質問を取得
    onMounted(() => {
      store.dispatch("getQuestions");
    });

    function showDetail(question) {
      console.log(question);
    }

    return {
      data,
      showDetail,
    };
  },
};
</script>

<style scoped></style>
