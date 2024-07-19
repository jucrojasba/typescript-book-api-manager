import { routes } from "./helpers/routes";

export function router() {
    

    const path = window.location.pathname;
    const publicRoute = routes.public.find(r => r.path === path);
    const privateRoute = routes.private.find(r => r.path === path);
    const token:string|null = localStorage.getItem('token');;
    
    //Si accede a ruta principal y no hay token
    if(path == '/' && !token) {
        navigateTo('/login');
        return
    }

    //Si accede a ruta principal y hay token
    if(path == '/' && token) {
        navigateTo('/home');
        return
    }

    //Manejo de rutas publicas

    if (publicRoute) {
        if((path == '/login' || path == '/register') && token){
            navigateTo('/home');
            return;
        }else{
            publicRoute.component();
            return;
        }
    } 

    //Manejo de rutas privadas

    if(privateRoute){
        if(token){
            privateRoute.component();
            return;
        }else{
            navigateTo('/login');
            return;
        }
    }

//Si no encuentra la ruta redirije a not-found
    if((!publicRoute || !privateRoute) && path != '/'){
        navigateTo('/not-found');
        return;
    }
}

export function navigateTo(path: string):void {
    window.history.pushState({}, "", window.location.origin + path);
    router();
}
window.addEventListener('popstate',router)