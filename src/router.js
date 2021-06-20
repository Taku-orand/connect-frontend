import { createRouter, createWebHistory } from "vue-router";
import Signup from "./components/Signup.vue";
import Signin from "./components/Signin.vue";
import Home from "./components/Home.vue";
import Question from "./components/Question.vue";
import QuestionList from "./components/QuestionList.vue";
import QuestionDetail from "./components/QuestionDetail.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/question",
      name: "question",
      component: Question,
      children: [
        {
          path: "list",
          name: "question_list",
          component: QuestionList,
        },
        {
          path: "detail/:id",
          name: "question_detail",
          component: QuestionDetail,
        },
      ],
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup,
    },
    {
      path: "/signin",
      name: "signin",
      component: Signin,
    },
  ],
});
