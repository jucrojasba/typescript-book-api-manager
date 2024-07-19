import { notFoundView } from "../views/public/not-found/not-found.view";
import { loginView } from "../views/public/login/login.view";
import { homeView } from "../views/private/home/home.view";

export const routes = {
  public: [
    { path: "/not-found", component: notFoundView },
    { path: "/login", component: loginView },
    { path: "/home", component: homeView },
  ],
};
