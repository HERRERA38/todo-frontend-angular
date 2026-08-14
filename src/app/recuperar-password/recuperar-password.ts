import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recuperar-password',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './recuperar-password.html',
  styleUrl: './recuperar-password.css',
})
export class RecuperarPassword {
  recuperarForm: FormGroup;
  mensajeEnviado = signal(false);

  constructor(private fb: FormBuilder) {
    this.recuperarForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.recuperarForm.invalid) {
      return;
    }
    // TODO: conectar con endpoint real de recuperación de contraseña
    // cuando se implemente en el backend (Nivel 5, con envío de correos)
    this.mensajeEnviado.set(true);
  }
}