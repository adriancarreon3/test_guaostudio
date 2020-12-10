import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guard';
import { NotFoundPageComponent } from './notfoundpage/notfoundpage.component';
import { LoginComponent } from './login/login.component';
import { LoadingComponent } from './loading/loading.component';
import { DepartamentoModule } from './departamento/departamento.module';
import { UsuarioModule } from './usuario/usuario.module';
import { BlogModule } from './blog/blog.module';

const routes: Routes = [
  { path: "login", component: LoginComponent, canActivate: [AuthGuard]},
  { path: "loading", component: LoadingComponent},
  { path: "departamentos", loadChildren: './departamento/departamento.module#DepartamentoModule', canActivate: [AuthGuard]},
  { path: "usuarios", loadChildren: './usuario/usuario.module#UsuarioModule', canActivate: [AuthGuard]},
  { path: "blog", loadChildren: './blog/blog.module#BlogModule', canActivate: [AuthGuard]},
  { path: '', redirectTo: 'blog', pathMatch: 'full' },
  { path: "**", component: NotFoundPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
