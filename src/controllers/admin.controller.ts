import { RequestAllUser, ResponseAdmin, RequestUpdateRol, ResponseUpdateRole } from "../models/admin.model";

export class AdminController{
    constructor(private endpointUsers:string){}

    //Controller Get All Users with pagination
    async getAllUsers(data: RequestAllUser): Promise<ResponseAdmin> {
        const domain: string = 'http://190.147.64.47:5155';
        const params = `?limit=10&page=${data.currentPage}`;
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.token}`
        };
        const reqOptions: RequestInit = {
            method: 'GET',
            headers: headers,
        };
        const url = domain + this.endpointUsers + params;
    
        const result: Response = await fetch(url, reqOptions);
        const responseBody = await result.json();
    
        if (result.status === 200) {
            return responseBody as ResponseAdmin;
        } else {
            console.error(`Response body: ${responseBody.message}`);
            throw new Error(`Response body: ${responseBody.message}`);
        }
    }  

    //Controller Update User Role
    async updateRol(data: RequestUpdateRol): Promise<ResponseUpdateRole> {
        const domain: string = 'http://190.147.64.47:5155';
        const params = `/${data.id}/role?role=${data.roleToUpdate}`;
        console.log(params);
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.token}`
        };
        const reqOptions: RequestInit = {
            method: 'PATCH',
            headers: headers,
        };
        const url = domain + this.endpointUsers + params;
    
        try {
            const result: Response = await fetch(url, reqOptions);
            const responseBodyUpdate: ResponseUpdateRole = await result.json();
    
            if (result.status === 200) {
                return responseBodyUpdate as ResponseUpdateRole;
            } else {
                console.error(`Response body: ${responseBodyUpdate.message}`);
                throw new Error(`Response body: ${responseBodyUpdate.message}`);
            }
        } catch (error) {
            console.error(`Error updating role: ${error}`);
            throw new Error(`Error updating role: ${error}`);
        }
    }
}