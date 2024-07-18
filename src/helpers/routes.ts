import { notFoundView } from "../views/public/not-found/not-found"
import { loginView } from "../views/public/login/login"

export const routes = {
    public:[
        {path: '/not-found', component: notFoundView},
        {path: '/login', component: loginView}
    ]
}