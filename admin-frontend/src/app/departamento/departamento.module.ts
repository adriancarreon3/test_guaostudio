import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { MaterialModule } from "../shared/material.module";
import { DepartamentoFormComponent } from './departamento-form/departamento-form.component';
import { ConsultarDepartamentosComponent } from './consultar-departamentos/consultar-departamentos.component';
import { DetalleDepartamentoComponent } from './detalle-departamento/detalle-departamento.component';


@NgModule({
  imports: [
    SharedModule,
    // ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([
      { path: "consultar", component: ConsultarDepartamentosComponent },
      { path: "registrar", component: DepartamentoFormComponent },
      { path: "detalle/:nombre_dpto", component: DetalleDepartamentoComponent },
    ])
  ],
  declarations: [
    DepartamentoFormComponent,
    ConsultarDepartamentosComponent,
    DetalleDepartamentoComponent,
  ],
  providers: [
  ],
  exports: [
  ]
})
export class DepartamentoModule { }
