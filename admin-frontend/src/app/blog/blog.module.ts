import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { MaterialModule } from "../shared/material.module";
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrarBlogComponent } from './registrar-blog/registrar-blog.component';


@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    RouterModule.forChild([
      { path: "", component: DashboardComponent },
      { path: "registrar", component: RegistrarBlogComponent },
    ])
  ],
  declarations: [
    DashboardComponent,
    RegistrarBlogComponent],
  providers: [
  ],
  exports: [
  ]
})
export class BlogModule { }
