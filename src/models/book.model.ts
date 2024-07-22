export interface RequestBooks{
    token:string,
    currentPage:number
}

export interface ResponseRequestBooks{
    message:string,
    data:Array<Record<string,string>>
}

export interface PostBook{
    token:string,
    data:{title:string,
    author: string,
    description: string,
    summary: string,
    publicationDate: string}
}

export interface UpdateBook{
    token:string,
    id:string,
    data:{title:string,
        author: string,
        description: string,
        summary: string,
        publicationDate: string}

}

export interface DeleteBook{
    token:string,
    id:string,
}

export interface ResponseBook{
    message:string,
    data:Record<string,string>|null
}

