import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs';
import { GLOBAL } from './global';
import { Usuario } from '../_models/usuario-model';
import { JsonPipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public url:string;

  static instancia: UsuarioService;
  
  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url + 'usuarios';
  
    return UsuarioService.instancia = UsuarioService.instancia || this;
  }

  registrarUsuario(Usuario, token: string){
    let params = JSON.stringify(Usuario);
    let headers = new HttpHeaders({'Content-Type':'application/json', "Authorization": "Bearer " + token});

    return this._http.post(this.url, params, {headers:headers} )
      .map(res =>res);
  }

  signUp(User){
    let params = JSON.stringify(User);
    let headers = new HttpHeaders({'Content-Type':'application/json'});

    return this._http.post(GLOBAL.url+'signup', params, {headers:headers} )
      .map(res =>res);
  }

  getUsuarios(token: string){
    let auth_headers = new HttpHeaders().set("Authorization", "Bearer " + token);

    return this._http.get(this.url, {headers: auth_headers})
    .map(res=>res);
  }
  
  getUsuariosDepartamento(nombre_departamento: string, token: string){
    let auth_headers = new HttpHeaders().set("Authorization", "Bearer " + token);

    return this._http.get(this.url + `?filter[where][departamento.nombre]=${nombre_departamento}`, {headers: auth_headers})
    .map(res=>res);
  }

  getUsuarioByEmail(email: string, token: string){
    let auth_headers = new HttpHeaders().set("Authorization", "Bearer " + token);

    return this._http.get(this.url + `?filter[where][email]=${email}`, {headers: auth_headers})
    .map(res=>res);
  }

  eliminarUsuario(id_usuario: string, token: string){
    let headers = new HttpHeaders({'Content-Type':'application/json', "Authorization": "Bearer " + token});
    
    return this._http.delete(this.url + '/' + id_usuario,{headers:headers})
      .map(res=>res);
  }

  Login(User){
    let params = JSON.stringify(User);
    let headers = new HttpHeaders({'Content-Type':'application/json'});

    return this._http.post(GLOBAL.url+'users/login', params, {headers:headers} )
      .map(res =>res);
  }

  Logout(){
    localStorage.removeItem('usuario_blog');
    localStorage.removeItem('token');
  }

  isAuthenticated() {
    let usuario = <Usuario>JSON.parse(localStorage.getItem('usuario_blog'));
    let token   = <String>JSON.parse(localStorage.getItem('token'));
    return usuario && token ? true : false;
  }

}
