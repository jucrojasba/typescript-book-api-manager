import { notFoundView } from "../views/public/not-found/not-found.view";
import { loginView } from "../views/public/login/login.view";
import { registerView } from "../views/public/register/register.view";
import { homeView } from "../views/private/home/home.view";
import { setAdminView } from "../views/private/admin/set-admin.view";

export const routes = {
  public: [
    { path: "/not-found", component: notFoundView },
    { path: "/login", component: loginView },
    { path: "/register", component: registerView },
  ],
  private: [
    { path: "/home", component: homeView }
  ],
  admin:[
    {path:"/set-admin", component: setAdminView}
  ]
};
