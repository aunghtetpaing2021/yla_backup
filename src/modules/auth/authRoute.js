import AppWrapper from "@/layouts/mainlayout/AppWrapper.vue";

const userRoutes = [
  {
    path: "/auth",
    name: "auth",
    component: AppWrapper,
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("@/modules/auth/pages/Login.vue"),
      },
    ],
  },
];

export default userRoutes;
