import { Component, OnInit, signal } from '@angular/core';
import { TareaService, Tarea } from '../services/tarea';

@Component({
  selector: 'app-tareas',
  imports: [],
  templateUrl: './tareas.html',
  styleUrl: './tareas.css',
})
export class Tareas implements OnInit {
  tareas = signal<Tarea[]>([]);

  constructor(private tareaService: TareaService) {}

  ngOnInit(): void {
    this.tareaService.listar().subscribe({
      next: (data) => {
        this.tareas.set(data);
      },
      error: (err) => {
        console.error('Error al cargar tareas:', err);
      },
    });
  }
}