import { Component, OnInit, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/productService';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './list-products.html',
  styleUrls: ['./list-products.css']
})
export class ListProducts implements OnInit {
  products = signal<any[]>([]);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);
  
  private toastr = inject(ToastrService);
  
  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }
  
  getProducts() {
    this.isLoading.set(true);
    this.error.set(null);
    
    this._productService.getProducts().subscribe({
      next: (data: any) => {
        this.products.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.error.set('Error al cargar los productos');
        this.toastr.error('No se pudieron cargar los productos', 'Error');
        this.isLoading.set(false);
      }
    });
  }

  deleteProduct(id: string) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this._productService.deleteProduct(id).subscribe({
        next: () => {
          // Actualizar la lista removiendo el producto eliminado
          this.products.update(products => 
            products.filter(p => p._id !== id)
          );
          this.toastr.warning('Producto eliminado correctamente', 'Éxito');
        },
        error: (err) => {
          console.error('Error al eliminar producto:', err);
          this.error.set('Error al eliminar el producto');
          this.toastr.error('No se pudo eliminar el producto', 'Error');
        }
      });
    }
  }
}