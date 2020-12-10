import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioService } from 'src/app/_services/usuario.service';

@Component({
  selector: 'app-consultar-usuarios',
  templateUrl: './consultar-usuarios.component.html',
  styleUrls: ['./consultar-usuarios.component.scss']
})
export class ConsultarUsuariosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
    
  usuarios   : Array<any>=[];

  displayedColumns: Array<String> = ["email", "departamento", "rol", "acciones"];
  dataSource: any = null;

  private token: string;

  constructor(private usuarioService: UsuarioService, private snackBar: MatSnackBar) {
    this.token = <string>JSON.parse(localStorage.getItem('token'));
   }

  ngOnInit(): void {
    this.getUsuarios();
  }

  async getUsuarios(){
    const dataUsuarios = await this.usuarioService.getUsuarios(this.token).toPromise();
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

  async eliminarUsuario(id_usuario: string){
    const dataEliminarUsuario = await this.usuarioService.eliminarUsuario(id_usuario, this.token).toPromise();
    if(dataEliminarUsuario==null){
      this.snackBar.open('Usuario eliminado con éxito', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      this.getUsuarios();
    }
    else{
      console.log(dataEliminarUsuario)
    }
  }

}
