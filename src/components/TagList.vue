<template>
  <div class="container sticky">
    <h2 class="text-center m-4">タグ一覧</h2>
    <ul class="list-group">
      <li v-for="(tag, key) in $store.state.tags" :key="key" class="list-group-item">{{ tag.name }}</li>
    </ul>
  </div>
</template>

<script>
import { reactive } from "vue";
// import axios from "axios";
// import { useRoute } from "vue-router";
// import { useStore } from "vuex";

export default {
  name: "TagList",
  props: {},
  setup() {
    // const router = useRouter();
    // const route = useRoute();
    // const store = useStore();

    const data = reactive({
      test: Object,
    });

    // Questionコンポーネントをロードした時にタグを取得
    // onMounted(() => {
    //   store.dispatch("getTags");
    // });

    return {
      data,
    };
  },
};
</script>

<style scoped>
.sticky {
  position: sticky;
  top: 1.5rem; /* bootstrapのm-4が要素の基本サイズ*1.5のため（<h2>タグ一覧<h/2>） */
}
.list-group {
  height: 50vh;
  overflow: auto;
}
</style>
