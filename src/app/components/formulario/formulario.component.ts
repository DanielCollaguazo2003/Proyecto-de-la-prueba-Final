import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Tarea } from 'src/app/domain/tarea';
import { TareaFirebaseService } from 'src/app/services/tarea-firebase.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  tarea?: Tarea;


  constructor(private _tareaFirebaseService: TareaFirebaseService){

  }

  form = new FormGroup({
    uid: new FormControl(this._tareaFirebaseService.generateUid(), []),
    nombre: new FormControl('', [Validators.required]),
    fecha: new FormControl<Date | null>(null, [Validators.required]),
    contenido: new FormControl('', [Validators.required]),
    etiquetas: new FormControl('', [Validators.required]),
  })

  agregartarea() {
    console.log(<Tarea>(this.form.getRawValue()));
    if (this.form.invalid) {
      alert('La informacion ingresada es incorrecta o incompleta');
      return
    }

    const tarea: Tarea = <Tarea>(this.form.getRawValue());


    this._tareaFirebaseService.save(tarea);

    this.form.reset();
  }
}
