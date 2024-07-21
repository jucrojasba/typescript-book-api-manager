import { routes } from "./helpers/routes";
import { encrypt, decrypt } from "./services/guard";

export function router() {
    

    const path = window.location.pathname;
    const publicRoute = routes.public.find(r => r.path === path);
    const privateRoute = routes.private.find(r => r.path === path);
    const adminRoute = routes.admin.find(r => r.path === path);
    
    //Check sesion persistence in local Storage 
    function checkLocalStorage(){
        let token, role:string|null=null;
        if(localStorage.length != 0){
            token = decrypt(`${localStorage.getItem(encrypt('token'))}`);
            role =decrypt(`${localStorage.getItem(encrypt('role'))}`);
        }
        return {token, role}
    }

    //Asign checked values to token and role
    const token = checkLocalStorage().token;
    const role = checkLocalStorage().role;

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

    //Si accede a la ruta admin y no es admin
    if(path=='/admin' && role !== 'admin'){
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

    //Manejo de rutas privadas

    if(adminRoute){
        if(token){
            adminRoute.component();
            return;
        }else{
            navigateTo('/login');
            return;
        }
    }

//Si no encuentra la ruta redirije a not-found
    if((!publicRoute || !privateRoute || !adminRoute) && path != '/'){
        navigateTo('/not-found');
        return;
    }
}

export function navigateTo(path: string):void {
    window.history.pushState({}, "", window.location.origin + path);
    router();
}
window.addEventListener('popstate',router)