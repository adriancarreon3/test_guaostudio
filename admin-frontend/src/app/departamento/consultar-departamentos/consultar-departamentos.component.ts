import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Departamento } from 'src/app/_models/departamento-model';
import { DepartamentoService } from 'src/app/_services/departamento.service';

@Component({
  selector: 'app-consultar-departamentos',
  templateUrl: './consultar-departamentos.component.html',
  styleUrls: ['./consultar-departamentos.component.scss']
})
export class ConsultarDepartamentosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  departamentos   : Array<Departamento>=[];
  displayedColumns: Array<String> = ["departamento", "acciones"];
  dataSource      : any = null;

  private token: string;

  constructor(private departamentoService: DepartamentoService, private router: Router, private snackBar: MatSnackBar) { 
    this.token = <string>JSON.parse(localStorage.getItem('token'));
  }

  ngOnInit(): void {
    this.getDepartamentos();
  }

  async getDepartamentos(){
    const dataDepartamentos = await this.departamentoService.getDepartamentos(this.token).toPromise();
    if(dataDepartamentos){
      this.actualizarLista(dataDepartamentos);
    }
    else{
      this.actualizarLista([]);
    }
  }

  actualizarLista(departamentos) {
    this.departamentos        = departamentos;
    this.dataSource           = new MatTableDataSource(this.departamentos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort      = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  seleccionarDepartamento(row){
    this.router.navigate(['departamentos/detalle/'+row.nombre]);
  }

  async eliminarDepartamento(id_departamento: string){
    const dataEliminarDepartamento = await this.departamentoService.eliminarDepartamento(id_departamento, this.token).toPromise();
    if(dataEliminarDepartamento==null){
      this.snackBar.open('Departamento eliminado con éxito', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      this.getDepartamentos();
    }
    else{
      console.log(dataEliminarDepartamento)
    }
  }

}
