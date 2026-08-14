import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TareaService, Tarea } from '../services/tarea';

@Component({
  selector: 'app-tareas',
  imports: [ReactiveFormsModule],
  templateUrl: './tareas.html',
  styleUrl: './tareas.css',
})
export class Tareas implements OnInit {
  tareas = signal<Tarea[]>([]);
  tareaEditando = signal<number | null>(null);
  mostrarFormulario = signal(false);

  tareaForm: FormGroup;

  constructor(
    private tareaService: TareaService,
    private fb: FormBuilder
  ) {
    this.tareaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      fecha_caducidad: [''],
      completada: [false],
    });
  }

  ngOnInit(): void {
    this.cargarTareas();
  }

  cargarTareas(): void {
    this.tareaService.listar().subscribe({
      next: (data) => this.tareas.set(data),
      error: (err) => console.error('Error al cargar tareas:', err),
    });
  }

  abrirFormularioCrear(): void {
    this.tareaEditando.set(null);
    this.tareaForm.reset({ nombre: '', descripcion: '', fecha_caducidad: '', completada: false });
    this.mostrarFormulario.set(true);
  }

  abrirFormularioEditar(tarea: Tarea): void {
    this.tareaEditando.set(tarea.id);
    this.tareaForm.setValue({
      nombre: tarea.nombre,
      descripcion: tarea.descripcion,
      fecha_caducidad: tarea.fecha_caducidad ?? '',
      completada: tarea.completada,
    });
    this.mostrarFormulario.set(true);
  }

  cancelar(): void {
    this.mostrarFormulario.set(false);
    this.tareaEditando.set(null);
  }

  onSubmit(): void {
    if (this.tareaForm.invalid) {
      return;
    }

    const datos = this.tareaForm.value;
    const idEditando = this.tareaEditando();

    if (idEditando === null) {
      this.tareaService.crear(datos).subscribe({
        next: () => {
          this.cargarTareas();
          this.mostrarFormulario.set(false);
        },
        error: (err) => console.error('Error al crear tarea:', err),
      });
    } else {
      this.tareaService.actualizar(idEditando, datos).subscribe({
        next: () => {
          this.cargarTareas();
          this.mostrarFormulario.set(false);
          this.tareaEditando.set(null);
        },
        error: (err) => console.error('Error al actualizar tarea:', err),
      });
    }
  }

  eliminarTarea(id: number): void {
    if (!confirm('¿Seguro que quieres eliminar esta tarea?')) {
      return;
    }
    this.tareaService.eliminar(id).subscribe({
      next: () => this.cargarTareas(),
      error: (err) => console.error('Error al eliminar tarea:', err),
    });
  }
}