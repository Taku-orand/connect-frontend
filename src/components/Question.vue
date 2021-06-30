<template>
  <div class="row">
    <div class="col-3">
      <TagList></TagList>
    </div>
    <div class="col-9">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
// import axios from "axios";
// import { useRoute } from "vue-router";
// import { useStore } from "vuex";

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
    // const store = useStore();

    const data = reactive({});

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
