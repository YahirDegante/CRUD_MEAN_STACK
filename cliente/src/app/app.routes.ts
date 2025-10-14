import { Routes } from '@angular/router';
import { ListProducts } from './components/list-products/list-products';
import { CreateProduct } from './components/create-product/create-product';

export const routes: Routes = [
    {path: '', component: ListProducts},
    {path: 'createProduct', component: CreateProduct},
    {path: 'editProduct/:id', component: CreateProduct},
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
