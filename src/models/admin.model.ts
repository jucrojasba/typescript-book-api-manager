export interface RequestAllUser{
    token:string,
    currentPage:number
}

export interface ResponseAdmin{
    message:string,
    data:Record<string,string>
}

export interface RequestUpdateRol{
    id:string,
    roleToUpdate:string,
    token:string
}