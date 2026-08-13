import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  registroForm: FormGroup;
  errorMensaje = signal('');
  exitoMensaje = signal('');

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    if (this.registroForm.invalid) {
      return;
    }

    const { username, email, password } = this.registroForm.value;

    this.authService.registro(username, email, password).subscribe({
      next: () => {
        this.exitoMensaje.set('Cuenta creada correctamente. Redirigiendo...');
        this.errorMensaje.set('');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 5000);
      },
      error: () => {
        this.errorMensaje.set('No se pudo crear la cuenta. Verifica los datos.');
        this.exitoMensaje.set('');
      },
    });
  }
}