import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './create-product.html',
  styleUrls: ['./create-product.css']
})
export class CreateProduct {
  productForm: FormGroup;
  private toastr = inject(ToastrService);

  constructor(private fb: FormBuilder, private router: Router) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      this.toastr.error('Por favor completa todos los campos correctamente', 'Error');
      return;
    }

    const product = this.productForm.value;
    console.log('Producto creado:', product); 

    this.toastr.success('Producto creado exitosamente', 'Éxito');
    this.router.navigate(['/']);
  }
}