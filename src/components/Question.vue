<template>
  <div class="container-fluid">
    <div v-if="data.tagList" class="row">
      <div class="col-3">
        <TagList></TagList>
      </div>
      <div class="col-9">
        <router-view @showTagList="showTagList"></router-view>
      </div>
    </div>
    <div v-else class="row">
      <div class="col-12">
        <router-view @showTagList="showTagList"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
// import axios from "axios";
// import { useRouter } from "vue-router";
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

    const data = reactive({
      tagList: Boolean,
    });

    function showTagList(show) {
      data.tagList = show;
    }

    return {
      data,
      showTagList,
    };
  },
};
</script>

<style scoped></style>
