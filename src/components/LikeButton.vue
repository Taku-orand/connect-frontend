<template>
  <button @click.stop="addLike" type="button" class="btn btn-primary">
    いいね <span class="badge badge-light">{{ question.like }}</span>
  </button>
</template>

<script>
import { reactive } from "vue";
import axios from "axios";
// import { useRouter } from "vue-router";
// import { useStore } from "vuex";

export default {
  name: "QuestionList",
  components: {},
  props: { question: Object },
  setup(props) {
    // const router = useRouter();
    // const route = useRoute();
    // const store = useStore();

    const data = reactive({});

    function addLike() {
      console.log("like");
      axios
        .post(`${process.env.VUE_APP_CONNECT_BACKEND_URL}/likes/`)
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          alert(e);
        });
    }

    return {
      data,
      addLike,
    };
  },
};
</script>

<style scoped></style>
