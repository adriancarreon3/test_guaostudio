import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UsuarioService } from '../_services/usuario.service';
import { User } from '../_models/usuario-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: "login-form",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  @Output() isAuth = new EventEmitter<boolean>();
  
  public loginForm: FormGroup;
  public Usuario  : User;
  public returnUrl: string;

  constructor(private usuarioServicio: UsuarioService, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar, public formBuilder: FormBuilder) { 
    this.Usuario = new User(null, null ,null);

    this.loginForm = this.formBuilder.group({
      'email'   : ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "blog";
    }, 500);
  }
  
  async login() {
    try {
      const dataLogin: any = await this.usuarioServicio.Login(this.Usuario).toPromise();      
      if(dataLogin.token){
        const dataUsuario: any = await this.usuarioServicio.getUsuarioByEmail(this.Usuario.email, dataLogin.token).toPromise();
        if(dataUsuario[0]){
          this.isAuth.emit(true);
          localStorage.setItem('usuario_blog', JSON.stringify(dataUsuario[0]))
          localStorage.setItem('token', JSON.stringify(dataLogin.token))
          this.router.navigate([this.returnUrl]);
        }
        else{
          this.errorLogin();
        }
      }
      else
        this.errorLogin();
      
    } catch (error) {
      console.log(error)
      this.errorLogin()
    }   
  }
  
  errorLogin(){
    this.snackBar.open('Inicio de sesión incorrecto. Inténtelo de nuevo.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    this.Usuario.password = ""
  }
}
