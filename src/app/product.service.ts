import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private http:HttpClient) { }

  get_url = "https://dummyjson.com/products";
  post_url='https://dummyjson.com/products/add'

  fetchProduct(){
  return  this.http.get(this.get_url);
  }

  postProduct(body:any){
    return this.http.post(this.post_url,body)
  }

  putProduct(body:any,id:any){
    return this.http.put(this.get_url+ "/" +id,body)
  }
}
