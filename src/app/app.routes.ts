import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Registro } from './registro/registro';
import { RecuperarPassword } from './recuperar-password/recuperar-password';
import { Tareas } from './tareas/tareas';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },
  { path: 'recuperar-password', component: RecuperarPassword },
  { path: 'tareas', component: Tareas },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
