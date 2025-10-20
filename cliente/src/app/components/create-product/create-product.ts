import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../services/productService';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './create-product.html',
  styleUrls: ['./create-product.css']
})
export class CreateProduct implements OnInit {
  productForm: FormGroup;
  private toastr = inject(ToastrService);
  isLoading = false;
  productId: string | null = null;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    
    if (this.productId) {
      this.isEditMode = true;
      this.loadProduct();
    }
  }

  loadProduct() {
    if (!this.productId) return;
    
    this.isLoading = true;
    this.productService.getProduct(this.productId).subscribe({
      next: (product: any) => {
        this.productForm.patchValue({
          name: product.name,
          category: product.category,
          location: product.location,
          price: product.price
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar producto:', err);
        this.toastr.error('Error al cargar el producto', 'Error');
        this.isLoading = false;
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      this.toastr.error('Por favor completa todos los campos correctamente', 'Error');
      return;
    }

    this.isLoading = true;
    const product = this.productForm.value;

    if (this.isEditMode && this.productId) {
      this.productService.updateProduct(this.productId, product).subscribe({
        next: (response) => {
          console.log('Producto actualizado exitosamente:', response);
          this.toastr.info('Producto actualizado exitosamente', 'Éxito');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error al actualizar producto:', err);
          this.toastr.error('Error al actualizar el producto', 'Error');
          this.isLoading = false;
        }
      });
    } else {
      this.productService.createProduct(product).subscribe({
        next: (response) => {
          console.log('Producto creado exitosamente:', response);
          this.toastr.success('Producto creado exitosamente', 'Éxito');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error al crear producto:', err);
          this.toastr.error('Error al crear el producto', 'Error');
          this.isLoading = false;
        }
      });
    }
  }
}