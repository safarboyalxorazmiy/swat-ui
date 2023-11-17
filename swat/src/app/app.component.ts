import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { ProductionapiService } from './services/productionapi.service'
import { AuthService } from './services/auth.service'
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public api: ProductionapiService, public auth: AuthService, private router: Router){}
  items: MenuItem[];
  activeItem: MenuItem;
  activeItem2: MenuItem;

  email: string | null
  role: string | null
  isAuth: boolean = false


  logout(){
      localStorage.clear()
      location.reload()
      this.isAuth = false
      window.location.href = "/"
      // location.reload()
  }


  ngOnInit(): void {

    this.email = localStorage.getItem("email")
    this.role = localStorage.getItem("role")

    console.log(this.email, this.role)
    if(this.role && this.email){
      this.isAuth = true 
    }
    if (this.role){
      this.items = [
        {label: 'Kirim', icon: 'pi pi-cloud-upload', routerLink: '/income'},
        {label: 'Chiqim', icon: 'pi pi-cloud-download', routerLink: '/outcome'},
        {label: 'BOM', icon: 'pi pi-book', routerLink: '/bom'},
        {label: 'Liniyalar', icon: 'pi pi-map', routerLink: '/checkpoints'},
        {label: 'Detallar', icon: 'pi pi-list', routerLink: '/components'},
        {label: 'GS1', icon: 'pi pi-qrcode', routerLink: '/gs'},
        {label: 'AKT', icon: 'pi pi-replay', routerLink: '/akt'},
        {label: 'GP Production', icon: 'pi pi-sitemap', routerLink: '/gp'},
        {label: 'Lots', icon: 'pi pi-truck', routerLink: '/lots'},
        {label: 'Reja', icon: 'pi pi-chart-bar', routerLink: '/plan'},
      ]
    }else{
      this.items = [
              {label: 'Login', icon: 'pi pi-truck', routerLink: '/auth'}
          ];
    }
    // switch (this.role) {
    //   case "user":

    //     this.items = [
    //       {label: 'Kirim', icon: 'pi pi-cloud-upload', routerLink: '/income'},
    //       {label: 'Chiqim', icon: 'pi pi-cloud-download', routerLink: '/outcome'},
    //       {label: 'BOM', icon: 'pi pi-book', routerLink: '/bom'},
    //       {label: 'Liniyalar', icon: 'pi pi-map', routerLink: '/checkpoints'},
    //       {label: 'Detallar', icon: 'pi pi-list', routerLink: '/components'},
    //       {label: 'Register', icon: 'pi pi-user', routerLink: '/register'},
    //   ];
    //     break;
    //   case "tech":
    //     this.items = [
    //       {label: 'BOM', icon: 'pi pi-book', routerLink: '/bom'},
    //       {label: 'Liniyalar', icon: 'pi pi-map', routerLink: '/checkpoints'},
    //       {label: 'Detallar', icon: 'pi pi-list', routerLink: '/components'},
    //   ];
    //     break;
      
    //   default:
    //     this.items = [
    //       {label: 'Login', icon: 'pi pi-list', routerLink: '/auth'}
    //   ];
    //     break;
    // }
  this.activeItem = this.items[0];
    
  }
}
