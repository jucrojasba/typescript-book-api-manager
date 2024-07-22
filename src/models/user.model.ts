export interface RequestLoginUser{
    email:string,
    password:string
}

export interface ResponseUser{
    message:string,
    data:Record<string,string>
}

export interface RequestRegisterUser{
    name:string,
    lastName:string,
    email:string,
    password:string
}
