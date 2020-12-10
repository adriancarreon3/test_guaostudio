import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Departamento } from 'src/app/_models/departamento-model';
import { User, Usuario } from 'src/app/_models/usuario-model';
import { DepartamentoService } from 'src/app/_services/departamento.service';
import { UsuarioService } from 'src/app/_services/usuario.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent implements OnInit {

  public usuarioForm: FormGroup;
  public Usuario    : Usuario = <Usuario>{};
  public User       : User = <User>{};

  public departamentos: Array<Departamento>;
  
  public procesando: boolean  = false;

  private token: string;

  constructor(private usuarioService: UsuarioService, private departamentoService:DepartamentoService, private router: Router, private formBuilder: FormBuilder, private snackBar: MatSnackBar) { 
    this.Usuario = new Usuario(null, {nombre: null}, {nombre: null});
    this.User = new User(null, null, null);

    this.usuarioForm = this.formBuilder.group({
      email       : ['', Validators.compose([Validators.required, Validators.email])],
      password    : ['', [Validators.required, Validators.minLength(4)]],
      rol         : ['', Validators.required],
      departamento: ['', Validators.required],
    });

    this.token = <string>JSON.parse(localStorage.getItem('token'));
  }

  ngOnInit(): void {
    this.getDepartamentos()
  }

  async getDepartamentos(){
    const dataDepartamentos: any = await this.departamentoService.getDepartamentos(this.token).toPromise();
    if(dataDepartamentos){
      this.departamentos = dataDepartamentos;
    }
    else{
      this.departamentos = []
    }
  }

  async registrarUsuario(){
    this.procesando = true;
    
    try {
      this.User.id    = this.Usuario.email;
      this.User.email = this.Usuario.email;
  
      const signUp:any = await this.usuarioService.signUp(this.User).toPromise();
      if(signUp.id){
        
          const dataRegistrarUsuario:any = await this.usuarioService.registrarUsuario(this.Usuario, this.token).toPromise();
          if(dataRegistrarUsuario.id_usuario){
            this.snackBar.open('Usuario registrado con éxito', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            setTimeout(() => {
                this.procesando = false;
                this.reiniciarForm();
            }, 2000);
          }
          else{
            console.log(dataRegistrarUsuario)
            this.procesando = false;
            this.snackBar.open('Ocurrió un error. Inténtelo de nuevo', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
          }
      }
      else{
        console.log(signUp)
        this.procesando = false;
        this.snackBar.open('Ocurrió un error. Inténtelo de nuevo', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
    } catch (error) {
      console.log(error)
      this.procesando = false;
      this.snackBar.open('Ocurrió un error. Inténtelo de nuevo', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    }
    this.User.email = this.Usuario.email;
  }

  reiniciarForm(): void {
    this.usuarioForm.reset();
    this.router.navigate(['/usuarios/consultar']);
  }

  showPassword(input: any): any {
    input.type = input.type === 'password' ?  'text' : 'password';
  }

}
