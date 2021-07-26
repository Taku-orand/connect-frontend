<template>
  <div class="dropdown col-2">
    <button
      class="btn btn-secondary dropdown-toggle"
      type="button"
      id="dropdownMenuButton"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <i class="far fa-bell"></i>
    </button>
    <div
      class="dropdown-menu dropdown-menu-right"
      aria-labelledby="dropdownMenuButton"
    >
      <button @click="deleteNotification()" class="text-danger">
        通知削除
      </button>
      <div
        v-if="$store.state.notifications == false || $store.state.user.id == 0"
      >
        <span class="dropdown-item">通知はありません。</span>
      </div>
      <div v-else>
        <div
          v-for="(notification, key) in $store.state.notifications"
          :key="key"
          class="dropdown-item"
        >
          <div>
            <div v-if="notification.checked == true">
              <span class="font-weight-bold">{{
                notification.visitor_name
              }}</span
              >さんが
              <router-link
                :to="{
                  name: 'question_detail',
                  params: { id: notification.question_id },
                }"
                class="text-primary"
                ><span class="text-truncate d-inline-block question-content">{{
                  notification.question_content
                }}</span></router-link
              >
              にコメントしました。<br />
              <div class="m-0">
                <span
                  class="text-muted text-truncate d-inline-block answer-content"
                  >{{ notification.answer_content }}</span
                >
                <span class="float-right"
                  >〜{{ time_diff(notification.created_at) }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  name: "Notification",
  setup() {
    const store = useStore();
    const router = useRouter();
    const data = reactive({
      currentPage: 1,
      perPage: 10,
    });

    onMounted(() => {
      store.dispatch("getNotifications");
    });

    // 時間経過を計算する
    function time_diff(create_time) {
      var create = new Date(create_time);
      // 現在時刻との差分＝経過時間
      var diff = new Date().getTime() - create.getTime();
      // 経過時間をDateに変換
      var elapsed = new Date(diff);

      console.log(elapsed.getHours());
      if (elapsed.getUTCFullYear() - 1970) {
        return elapsed.getUTCFullYear() - 1970 + "年前";
      } else if (elapsed.getUTCMonth()) {
        return elapsed.getUTCMonth() + "ヶ月前";
      } else if (elapsed.getUTCDate() - 1) {
        return elapsed.getUTCDate() - 1 + "日前";
      } else if (elapsed.getUTCHours()) {
        return elapsed.getUTCHours() + "時間前";
      } else if (elapsed.getUTCMinutes()) {
        return elapsed.getUTCMinutes() + "分前";
      } else {
        return elapsed.getUTCSeconds() + "秒前";
      }
    }

    // 通知をすべて削除する
    function deleteNotification() {
      axios
        .delete(
          `${process.env.VUE_APP_CONNECT_BACKEND_URL}/notifications/destroy`,
          { withCredentials: true }
        )
        .then((response) => {
          if (response.data.delete_notifications) {
            store.commit("setAlert", {
              flag: {
                showSuccessAlert: true,
                showErrorAlert: false,
              },
              message: {
                success: "通知を削除しました。",
              },
            });
            store.dispatch("getNotifications");
            router.push({
              name: "home",
            });
          } else {
            store.commit("setAlert", {
              flag: {
                showSuccessAlert: false,
                showErrorAlert: true,
              },
              message: {
                error: "通知を削除できませんでした",
              },
            });
          }
        })
        .catch((e) => {
          alert(e);
        });
    }
    // function getPageCount(){
    //   return Math.ceil(data.items.length / data.parPage);
    // }

    // function clickCallback(page){
    //   data.currentPage = Number(page);
    // }

    return {
      data,
      // getPageCount,
      // clickCallback,
      time_diff,
      deleteNotification,
    };
  },
};
</script>
<style>
.question-content {
  max-width: 10rem;
}
.answer-content {
  max-width: 10rem;
}
@media screen and (max-width: 480px) {
  /* 480px以下に適用されるCSS（スマホ用） */
  /* .question-content{
  max-width: 2rem;
} */
  .answer-content {
    max-width: 5rem;
  }
}
</style>
