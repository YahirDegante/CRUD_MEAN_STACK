import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './list-products.html',
  styleUrls: ['./list-products.css']
})
export class ListProducts {}
