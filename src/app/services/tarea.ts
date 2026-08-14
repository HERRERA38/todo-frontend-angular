import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tarea {
  id: number;
  nombre: string;
  descripcion: string;
  fecha_caducidad: string | null;
  completada: boolean;
  fecha_creacion: string;
  usuario: number;
}

@Injectable({
  providedIn: 'root',
})
export class TareaService {
  private apiUrl = 'http://127.0.0.1:8000/api/tareas';

  constructor(private http: HttpClient) {}

  listar(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.apiUrl}/`);
  }

  crear(tarea: Partial<Tarea>): Observable<Tarea> {
    return this.http.post<Tarea>(`${this.apiUrl}/`, tarea);
  }

  actualizar(id: number, tarea: Partial<Tarea>): Observable<Tarea> {
    return this.http.patch<Tarea>(`${this.apiUrl}/${id}/`, tarea);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/`);
  }
}