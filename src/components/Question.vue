<template>
  <div class="container-fluid">
    <div v-if="data.tagList" class="row">
      <div class="col-md-3 tag-list">
        <TagList></TagList>
      </div>
      <div class="col-md-9">
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

<style scoped>
@media screen and (max-width: 959px) {
  /* 959px以下に適用されるCSS（タブレット用） */
}
@media screen and (max-width: 480px) {
  /* 480px以下に適用されるCSS（スマホ用） */
  .tag-list {
    display: none;
  }
}
</style>
