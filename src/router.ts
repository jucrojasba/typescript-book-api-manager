import { routes } from "./helpers/routes";

export function router() {
    

    const path = window.location.pathname;
    const publicRoute = routes.public.find(r => r.path === path);
    const token:string|null = localStorage.getItem('token');;
    
    if(path == '/' && !token) {
        navigateTo('/login');
    }

    if (publicRoute && !token) {
        publicRoute.component();
    } 

    if((!publicRoute) && path != '/'){
        navigateTo('/not-found');
    }
}

export function navigateTo(path: string):void {
    window.history.pushState({}, "", window.location.origin + path);
    router();
}