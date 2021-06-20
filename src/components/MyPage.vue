<template>
  <div class="container">
    <h2 class="text-center m-5">マイページ</h2>
    <p>{{ $store.state.user.email }}</p>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
// import axios from "axios";
// import { useRoute } from "vue-router";
// import { useStore } from "vuex";

export default {
  name: "MyPage",
  components: {},
  props: {},
  setup() {
    // const router = useRouter();
    // const route = useRoute();
    // const store = useStore();

    const data = reactive({});

    onMounted(() => {});

    return {
      data,
    };
  },
};
</script>

<style scoped></style>
