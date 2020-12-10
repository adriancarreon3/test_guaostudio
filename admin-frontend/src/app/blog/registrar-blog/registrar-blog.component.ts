import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Blog } from 'src/app/_models/blog-modelo';
import { Usuario } from 'src/app/_models/usuario-model';
import { BlogService } from 'src/app/_services/blog.service';

@Component({
  selector: 'app-registrar-blog',
  templateUrl: './registrar-blog.component.html',
  styleUrls: ['./registrar-blog.component.scss']
})
export class RegistrarBlogComponent implements OnInit {

  public blogForm: FormGroup;
  public Blog    : Blog = <Blog>{};
  
  public procesando: boolean  = false;

  public usuario_blog: Usuario;
  private token      : string;

  constructor(private blogService: BlogService, private router: Router, private formBuilder: FormBuilder, private snackBar: MatSnackBar) { 
    this.Blog = new Blog(null, null, {nombre: null});

    this.blogForm = this.formBuilder.group({
      contenido   : ['', Validators.required],
      
    });

    this.usuario_blog = <Usuario>JSON.parse(localStorage.getItem('usuario_blog'));
    this.token = <string>JSON.parse(localStorage.getItem('token'));
  }

  ngOnInit(): void {
  }

  async registrarBlog(){
    this.procesando = true;
    this.Blog.email = this.usuario_blog.email;
    this.Blog.departamento.nombre = this.usuario_blog.departamento.nombre;

    const dataRegistrarBlog:any = await this.blogService.registrarBlog(this.Blog, this.token).toPromise();
    if(dataRegistrarBlog.id_blog){
      this.snackBar.open('Blog registrado con éxito', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      setTimeout(() => {
          this.procesando = false;
          this.reiniciarForm();
      }, 2000);
    }
    else{
      this.procesando = false;
      this.snackBar.open('Ocurrió un error. Inténtelo de nuevo', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    }    
  }

  reiniciarForm(): void {
    this.blogForm.reset();
    this.router.navigate(['/blog']);
  }

}
