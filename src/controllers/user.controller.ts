import {RequestLoginUser, RequestRegisterUser, ResponseUser} from "../models/user.model"
export class UserController{
    constructor(private endpointLogin?:string, private endpointRegister?:string){}

    //Controller Login Request
    async postLogin(data:RequestLoginUser):Promise<ResponseUser>{
        const domain:string = 'http://190.147.64.47:5155'
        const headers: Record<string,string>={
            'Content-Type': 'application/json'
        }
        const reqOptions:RequestInit={
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        }
        const url = domain +this.endpointLogin;
        const result:Response = await fetch(url, reqOptions);
        if(result.status ===201){
            const responseBodyLogin:ResponseUser = await result.json();
            return responseBodyLogin;
        }else{
            console.error(`Response body: ${(await result.json()).message}`);
            throw new Error('Not authenticated');
        }
    }

    //Controlador de peticion de Register User
    async postRegister(data:RequestRegisterUser):Promise<ResponseUser>{
        const domain:string = 'http://190.147.64.47:5155'
        const headers: Record<string,string>={
            'Content-Type': 'application/json'
        }
        const reqOptions:RequestInit={
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        }
        const url = domain +this.endpointRegister;
        const result:Response = await fetch(url, reqOptions);
        if(result.status ===201){
            const responseBodyRegister:ResponseUser = await result.json();
            return responseBodyRegister;
        }else{
            console.error(`Response body: ${(await result.json()).message}`);
            throw new Error('Not authenticated');
        }
    }

}