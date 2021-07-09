<template>
  <router-view @showTagList="showTagList"></router-view>
</template>

<script>
import { reactive } from "vue";
// import axios from "axios";
// import { useRouter } from "vue-router";
// import { useStore } from "vuex";

export default {
  name: "Question",
  components: {},
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
.sticky-tag-list {
  position: sticky;
  top: 1.5rem; /* bootstrapのm-4が要素の基本サイズ*1.5のため（<h2>タグ一覧<h/2>） */
}
@media screen and (max-width: 959px) {
  /* 959px以下に適用されるCSS（タブレット用） */
}
@media screen and (max-width: 576px) {
  /* 576px以下に適用されるCSS（スマホ用） */
  .tag-list {
    display: none;
  }
}
</style>
