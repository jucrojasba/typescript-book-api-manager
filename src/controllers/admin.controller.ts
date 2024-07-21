import { RequestAllUser, ResponseAdmin, RequestUpdateRol } from "../models/admin.model";

export class AdminController{
    constructor(private endpointUsers:string){}

    //Controller Get All Users with pagination
    async getAllUsers(data:RequestAllUser):Promise<ResponseAdmin> {
        const domain:string = 'http://190.147.64.47:5155'
        const params = `?limit=10&page=${data.currentPage}`
        const headers: Record<string,string>={
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.token}`
        }
        const reqOptions:RequestInit={
            method: 'GET',
            headers: headers,
            body: JSON.stringify(data)
        }
        const url = domain +this.endpointUsers + params;

        const result:Response = await fetch(url, reqOptions);
        if(result.status ===201){
            const responseBodyUsers:ResponseAdmin = await result.json();
            return responseBodyUsers;
        }else{
            console.error(`Response body: ${(await result.json()).message}`);
            throw new Error(`Response body: ${(await result.json()).message}`)
        }

    }

    //Controller Update User Role
    async updateRol(data:RequestUpdateRol):Promise<ResponseAdmin>{
        const domain:string = 'http://190.147.64.47:5155'
        const params = `/${data.id}/role?${data.roleToUpdate}`
        const headers: Record<string,string>={
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.token}`
        }
        const reqOptions:RequestInit={
            method: 'GET',
            headers: headers,
            body: JSON.stringify(data)
        }
        const url = domain +this.endpointUsers + params;
        const result:Response=await fetch(url, reqOptions);

        if(result.status ===201){
            const responseBodyUpdate:ResponseAdmin = await result.json();
            return responseBodyUpdate;
        }else{
            console.error(`Response body: ${(await result.json()).message}`);
            throw new Error(`Response body: ${(await result.json()).message}`)
        }
        
    }
}