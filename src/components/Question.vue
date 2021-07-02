<template>
  <div class="row">
    <div class="col-3">
      <TagList></TagList>
    </div>
    <div class="col-9">
      <router-view></router-view>
      <button @click="goCreateQuestion" class="btn btn-info btn-lg fixed-bottom ml-auto m-5">質問する</button>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
// import axios from "axios";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import TagList from "./TagList.vue";

export default {
  name: "Question",
  components: {
    TagList,
  },
  props: {},
  setup() {
    const router = useRouter();
    // const route = useRoute();
    const store = useStore();

    const data = reactive({});

    function goCreateQuestion() {
      store.commit("resetAlert");
      router.push({
        name: "post",
      });
    }

    return {
      data,
      goCreateQuestion,
    };
  },
};
</script>

<style scoped></style>
