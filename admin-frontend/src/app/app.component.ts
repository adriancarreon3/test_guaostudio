import { Component, OnInit, OnDestroy } from '@angular/core';
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { UsuarioService } from './_services/usuario.service';
import { Usuario } from './_models/usuario-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isMobile: boolean;
  mode = "side"
  uiContent = "content"
  progrssBarClass = "progress-bar";
  isloading = true;
  
  public usuario_blog: Usuario;
  public iniciar: boolean = true;
  public permisos: number = 0;

  constructor(private router: Router, private breakpointObserver: BreakpointObserver, public usuarioServicio:UsuarioService) {

    this.isloading = true;

    breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
        this.isMobile = true;
        this.mode = "over"
        this.uiContent = "mobile-content"
      }
      else {
        this.isMobile = false;
        this.mode = "side"
        this.uiContent = "content"
      }
    });

    this.router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }

  ngOnInit(): void {
    this.usuario_blog = JSON.parse(localStorage.getItem('usuario_blog'));
    if(this.usuario_blog){
      this.iniciar = false;

      this.permisos = this.usuario_blog.rol.nombre == "Administrador" ? 1 : 0
    }
    this.isloading = false;
  }

  logout(): void {
    this.iniciar = true;
    this.usuarioServicio.Logout()
    this.router.navigate(['login']);
  }

  isAuth(isAuth?: any) {
    if (isAuth) {
      this.iniciar = true;
      setTimeout(() => {
        this.usuario_blog = JSON.parse(localStorage.getItem('usuario_blog'));
        this.iniciar      = false;

        this.permisos = this.usuario_blog.rol.nombre == "Administrador" ? 1 : 0
      }, 1000);
    }
  }

  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this. progrssBarClass = "progress-bar";
      this.isloading = true;
    }
    if (event instanceof NavigationEnd) {
      this. progrssBarClass = "progress-bar-hidden";
      this.isloading = false;
    }
    if (event instanceof NavigationCancel) {
      this. progrssBarClass = "progress-bar-hidden";
      this.isloading = false;
    }
    if (event instanceof NavigationError) {
      this. progrssBarClass = "progress-bar-hidden";
      this.isloading = false;
    }
  }

  ngOnDestroy() {
    this.breakpointObserver.ngOnDestroy();
  }

}
