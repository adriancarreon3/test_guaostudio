import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { MaterialModule } from "../shared/material.module";
import { ConsultarUsuariosComponent } from './consultar-usuarios/consultar-usuarios.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';


@NgModule({
  imports: [
    SharedModule,
    // ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([
      { path: "consultar", component: ConsultarUsuariosComponent },
      { path: "registrar", component: UsuarioFormComponent },
    ])
  ],
  declarations: [
    ConsultarUsuariosComponent,
    UsuarioFormComponent],
  providers: [
  ],
  exports: [
  ]
})
export class UsuarioModule { }
