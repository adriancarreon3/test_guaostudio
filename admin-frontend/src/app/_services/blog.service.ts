import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  public url:string;

  static instancia: BlogService;
  
  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url + 'blogs';
  
    return BlogService.instancia = BlogService.instancia || this;
  }

  registrarBlog(Blog, token: string){
    let params = JSON.stringify(Blog);
    let headers = new HttpHeaders({'Content-Type':'application/json', "Authorization": "Bearer " + token});

    return this._http.post(this.url, params, {headers:headers} )
      .map(res =>res);
  }

  getAllBlogs(token: string){
    let auth_headers = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this._http.get(this.url+`?filter[order]=fecha%20DESC`, {headers: auth_headers})
    .map(res=>res);
  }
  
  getBlogsDepartamento(nombre_departamento: string, token: string){
    let auth_headers = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this._http.get(this.url+ `?filter[where][departamento.nombre]=${nombre_departamento}&filter[order]=fecha%20DESC`, {headers: auth_headers})
    .map(res=>res);
  }
}
