import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Departamento } from 'src/app/_models/departamento-model';
import { DepartamentoService } from 'src/app/_services/departamento.service';

@Component({
  selector: 'app-departamento-form',
  templateUrl: './departamento-form.component.html',
  styleUrls: ['./departamento-form.component.scss']
})
export class DepartamentoFormComponent implements OnInit {

  public departamentoForm: FormGroup;
  public Departamento: Departamento = <Departamento>{};
  
  public procesando: boolean  = false;

  private token: string;

  constructor(private departamentoService: DepartamentoService, private router: Router, private formBuilder: FormBuilder, private snackBar: MatSnackBar) { 
    this.Departamento = new Departamento(null);

    this.departamentoForm = this.formBuilder.group({
      nom_dpto: ['', Validators.required]
    });

    this.token = <string>JSON.parse(localStorage.getItem('token'));
  }

  ngOnInit(): void {
  }

  async registrarDepartamento(){
    this.procesando = true;

    try {
      const dataRegistrarDepartamento:any = await this.departamentoService.registrarDepartamento(this.Departamento, this.token).toPromise();
      if(dataRegistrarDepartamento.id_departamento){
        this.snackBar.open('Departamento registrado con éxito', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        setTimeout(() => {
            this.procesando = false;
            this.reiniciarForm();
        }, 2000);
      }
      else{
        this.procesando = false;
        this.snackBar.open('Ocurrió un error. Inténtelo de nuevo', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }    
    } catch (error) {
      console.log(error)
      this.procesando = false;
      this.snackBar.open('Ocurrió un error. Inténtelo de nuevo', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    }
  }

  reiniciarForm(): void {
    this.departamentoForm.reset();
    this.router.navigate(['/departamentos/consultar']);
  }

}
