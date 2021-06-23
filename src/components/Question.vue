<template>
  <div class="container">
    <div class="row">
      <div class="col-3">
        <TagList></TagList>
      </div>
      <div class="col-9">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
// import axios from "axios";
// import { useRoute } from "vue-router";
import { useStore } from "vuex";

import TagList from "./TagList.vue";

export default {
  name: "Question",
  components: {
    TagList,
  },
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
