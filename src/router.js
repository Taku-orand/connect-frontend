import { createRouter, createWebHistory } from "vue-router";
import Signup from "./components/Signup.vue";
import Signin from "./components/Signin.vue";
import Home from "./components/Home.vue";
import MyPage from "./components/MyPage.vue";
import Question from "./components/Question.vue";
import QuestionList from "./components/QuestionList.vue";
import QuestionDetail from "./components/QuestionDetail.vue";
import CreateQuestion from "./components/CreateQuestion.vue";
import UpdateQuestion from "./components/UpdateQuestion.vue";
import Request from "./components/Request.vue";
import Auth0 from "./components/Auth0.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/auth0",
      name: "auth0",
      component: Auth0,
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
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/my_page",
      name: "my_page",
      component: MyPage,
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
          props: { isMyPage: false, tagList: false },
        },
        {
          path: "detail/:id",
          name: "question_detail",
          component: QuestionDetail,
          props: { tagList: true },
        },
        {
          path: "post",
          name: "post",
          component: CreateQuestion,
          props: { tagList: false },
        },
        {
          path: "update/:id",
          name: "update",
          component: UpdateQuestion,
          props: { tagList: false },
        },
      ],
    },
    {
      path: "/request",
      name: "request",
      component: Request,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { left: 0, top: 0 };
    }
  },
});
