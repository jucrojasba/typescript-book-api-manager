export interface RequestAllUser{
    token:string,
    currentPage:number
}

export interface ResponseAdmin{
    message:string,
    data:Array<Record<string,string>>
}

export interface RequestUpdateRol{
    id:string,
    roleToUpdate:string,
    token:string
}
export interface ResponseUpdateRole{
    message:string,
    data:Record<string,string>
}