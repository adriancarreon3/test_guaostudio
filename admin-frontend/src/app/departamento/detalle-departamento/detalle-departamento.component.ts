import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Departamento } from 'src/app/_models/departamento-model';
import { Usuario } from 'src/app/_models/usuario-model';
import { DepartamentoService } from 'src/app/_services/departamento.service';
import { UsuarioService } from 'src/app/_services/usuario.service';

@Component({
  selector: 'app-detalle-departamento',
  templateUrl: './detalle-departamento.component.html',
  styleUrls: ['./detalle-departamento.component.scss']
})
export class DetalleDepartamentoComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private sub: Subscription;
  
  public Departamento: Departamento;
  usuarios            : Array<Usuario>=[];

  displayedColumns: Array<String> = ["icono", "email", "rol"];
  dataSource      : any = null;
  
  private token: string;

  constructor(private route: ActivatedRoute, private usuarioService: UsuarioService, private departamentoService: DepartamentoService) { 
    this.token = <string>JSON.parse(localStorage.getItem('token'));
    
    this.sub = this.route.params.subscribe(
      params => {
          if(params.nombre_dpto){
            this.getDepartamento(params['nombre_dpto'])
            this.getUsuariosDepartamento(params['nombre_dpto']);
          }
      }
    );

  }
  
  ngOnInit(): void {
  }

  async getDepartamento(nombre_dpto: string){
    const dataDepartamento = await this.departamentoService.getDepartamento(nombre_dpto, this.token).toPromise();
    if(dataDepartamento[0]){
      this.Departamento = dataDepartamento[0];
    }
    else{
      console.log(dataDepartamento)
    }
  }

  async getUsuariosDepartamento(nombre_dpto: string){
    const dataUsuarios = await this.usuarioService.getUsuariosDepartamento(nombre_dpto, this.token).toPromise();
    if(dataUsuarios){
      this.actualizarLista(dataUsuarios);
    }
    else{
      this.actualizarLista([]);
    }
  }

  actualizarLista(usuarios) {
    this.usuarios             = usuarios;
    this.dataSource           = new MatTableDataSource(this.usuarios);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort      = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
