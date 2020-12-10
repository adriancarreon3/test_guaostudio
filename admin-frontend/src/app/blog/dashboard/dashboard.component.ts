import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/_models/blog-modelo';
import { Usuario } from 'src/app/_models/usuario-model';
import { BlogService } from 'src/app/_services/blog.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public usuario_blog: Usuario;
  private token      : string;

  public blogs   : Array<Blog> = [];
  public permisos: number = 0;

  constructor(private blogService: BlogService) {
    this.usuario_blog = <Usuario>JSON.parse(localStorage.getItem('usuario_blog'));
    this.token = <string>JSON.parse(localStorage.getItem('token'));
  }

  ngOnInit(): void {
    if(this.usuario_blog.rol.nombre == "Administrador"){
      this.getAllBlog();
      this.permisos = 1;
    }
    else{
      this.getBlogDepartamento();
    }
  }

  async getAllBlog(){
    const dataAllBlogs: any = await this.blogService.getAllBlogs(this.token).toPromise();
    if(dataAllBlogs[0]){
      this.blogs = dataAllBlogs;
    }
    else{
      console.log(dataAllBlogs)
    }
  }

  async getBlogDepartamento(){
    const dataBlogsDepartamento: any = await this.blogService.getBlogsDepartamento(this.usuario_blog.departamento.nombre, this.token).toPromise();
    if(dataBlogsDepartamento[0]){
      this.blogs = dataBlogsDepartamento;
    }
    else{
      console.log(dataBlogsDepartamento)
    }
  }

}
