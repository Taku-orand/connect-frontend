<template>
  <div class="container-fluid fixed-top">
    <!-- successアラート -->
    <div v-if="$store.state.alert.flag.showSuccessAlert" class="alert alert-success shadow mt-3" role="alert">
      <div class="row">
        <div class="col-10"><i class="fas fa-check-circle mr-2"></i>{{ $store.state.alert.message.success }}</div>
        <div class="col-2 text-right">
          <i class="fas fa-times ml-auto" @click="$store.commit('resetAlert')"></i>
        </div>
      </div>
    </div>
    <!-- errorアラート -->
    <div v-if="$store.state.alert.flag.showErrorAlert" class="alert alert-danger shadow mt-3" role="alert">
      <div class="row">
        <div class="col-10"><i class="fas fa-exclamation-circle mr-2"></i>{{ $store.state.alert.message.error }}</div>
        <div class="col-2 text-right">
          <i class="fas fa-times ml-auto" @click="$store.commit('resetAlert')"></i>
        </div>
      </div>
    </div>
    <!-- warningアラート -->
    <div v-if="$store.state.alert.flag.showWarningAlert" class="alert alert-warning shadow mt-3" role="alert">
      <div class="row">
        <div class="col-10"><i class="fas fa-exclamation-triangle mr-2"></i>{{ $store.state.alert.message.warning }}</div>
        <div class="col-2 text-right">
          <i class="fas fa-times ml-auto" @click="$store.commit('resetAlert')"></i>
        </div>
      </div>
    </div>
  </div>
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
