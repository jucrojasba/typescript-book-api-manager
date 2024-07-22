import { DeleteBook, PostBook, RequestBooks, ResponseBook, ResponseRequestBooks, UpdateBook } from "../models/book.model";

 export class BookController{
    constructor(private endpointBook:string){}

    //Controller Request Get All Books
    async getBooks(data:RequestBooks):Promise<ResponseRequestBooks>{
        const domain:string ='http://190.147.64.47:5155/';
        const params = `?limit=4&page=${data.currentPage}`;
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.token}`
        };
        const reqOptions: RequestInit = {
            method: 'GET',
            headers: headers,
        };
        const url = domain + this.endpointBook + params;
        const result:Response = await fetch(url,reqOptions);
        const responseBody = await result.json();

        if(result.status === 200){
            return responseBody as ResponseRequestBooks;
        }else{
            console.error(`Response body: ${responseBody.message}`);
            throw new Error(`Response body: ${responseBody.message}`);
        }
    }

    //Controller post book
    async postBook(data:PostBook):Promise<ResponseBook>{
        const domain:string='http://190.147.64.47:5155/';
        const headers:Record<string,string>={
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.token}`
        }
        const reqOptions:RequestInit={
            method: 'POST',
            headers:headers,
            body: JSON.stringify(data.data)
        }
        const url = domain + this.endpointBook
        const result:Response = await fetch(url,reqOptions);
        const responseBody:ResponseBook=await result.json();
        
        if(result.status === 201){
            return responseBody as ResponseBook
        }else{
            console.error(`Response body: ${responseBody.message}`);
            throw new Error(`Response body: ${responseBody.message}`);
        }
    }

    //Controller update Book
    async updateBook(data:UpdateBook):Promise<ResponseBook>{
        const domain:string='http://190.147.64.47:5155/';
        const params:string=`/${data.id}`;
        const headers:Record<string,string>={
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.token}`
        }
        const reqOptions:RequestInit={
            method: 'PATCH',
            headers:headers,
            body: JSON.stringify(data.data)
        }
        const url = domain + this.endpointBook + params;
        const result:Response = await fetch(url,reqOptions);
        const responseBody:ResponseBook=await result.json();
        
        if(result.status === 200){
            return responseBody as ResponseBook
        }else{
            console.error(`Response body: ${responseBody.message}`);
            throw new Error(`Response body: ${responseBody.message}`);
        }
    }

    //Controller Delete Book
    async deleteBook(data:DeleteBook):Promise<ResponseBook>{
        const domain:string='http://190.147.64.47:5155/';
        const params:string=`/${data.id}`;
        const headers:Record<string,string>={
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.token}`
        }
        const reqOptions:RequestInit={
            method: 'DELETE',
            headers:headers,
        }
        const url = domain + this.endpointBook + params;
        const result:Response = await fetch(url,reqOptions);
        const responseBody:ResponseBook=await result.json();
        
        if(result.status === 200){
            return responseBody as ResponseBook
        }else{
            console.error(`Response body: ${responseBody.message}`);
            throw new Error(`Response body: ${responseBody.message}`);
        }
    }
 }