import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = 'http://localhost:4000/api/products';
  
  constructor(private http: HttpClient) { }
  
  getProducts() {
    return this.http.get(this.url);
  }
  
  createProduct(product: any) {
    return this.http.post(this.url, product);
  }
  
  getProduct(id: string) {
    return this.http.get(`${this.url}/${id}`);
  }
  
  updateProduct(id: string, product: any) {
    return this.http.put(`${this.url}/${id}`, product);
  }
  
  deleteProduct(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }
}