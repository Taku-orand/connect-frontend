<template>
  <!-- successアラート -->
  <div v-if="$store.state.alert.flag.showSuccessAlert" class="alert alert-success mt-3" role="alert">{{ $store.state.alert.message.success }}</div>
  <!-- errorアラート -->
  <div v-if="$store.state.alert.flag.showErrorAlert" class="alert alert-danger mt-3" role="alert">{{ $store.state.alert.message.error }}</div>
</template>

<script>
import { reactive } from "vue";
// import { useStore } from "vuex";

export default {
  name: "Alert",
  props: {
    user: Object,
  },
  setup() {
    // const store = useStore();

    const data = reactive({});

    return {
      data,
    };
  },
};
</script>

<style scoped></style>
