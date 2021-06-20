<template>
  <h2>this is home</h2>
</template>

<script>
import { reactive, onMounted } from "vue";
// import axios from "axios";
import { useRouter } from "vue-router";

export default {
  name: "Home",
  props: {},
  setup() {
    const router = useRouter();
    // const route = useRoute();

    const data = reactive({
      test: Object,
    });

    // バージョン1.0.0では質問機能以外の実装はしないのでホーム画面から直接質問画面に飛ばす。
    onMounted(() => {
      router.push({
        name: "question_list",
      });
    });

    return {
      data,
    };
  },
};
</script>

<style scoped></style>
