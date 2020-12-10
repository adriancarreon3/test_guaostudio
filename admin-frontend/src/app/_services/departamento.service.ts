import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  public url:string;

  static instancia: DepartamentoService;
  
  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url + 'departamentos';
  
    return DepartamentoService.instancia = DepartamentoService.instancia || this;
  }

  registrarDepartamento(Departamento, token: string){
    let params = JSON.stringify(Departamento);
    let headers = new HttpHeaders({'Content-Type':'application/json', "Authorization": "Bearer " + token});

    return this._http.post(this.url, params, {headers:headers} )
      .map(res =>res);
  }

  getDepartamentos(token: string){
    let auth_headers = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this._http.get(this.url, {headers: auth_headers})
    .map(res=>res);
  }
  
  getDepartamento(nombre_departamento: string, token: string){
    let auth_headers = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this._http.get(this.url+ `?filter[where][nombre]=${nombre_departamento}`, {headers: auth_headers})
    .map(res=>res);
  }

  eliminarDepartamento(id_departamento: string, token: string){
    let headers = new HttpHeaders({'Content-Type':'application/json'});
    let auth_headers = new HttpHeaders().set("Authorization", "Bearer " + token);
    
    return this._http.delete(this.url + '/' + id_departamento,{headers:auth_headers})
      .map(res=>res);
  }
}
