import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
  
})
export class AuthComponent implements OnInit {

  form: FormGroup
  submitted: boolean = false
  errMessage: string
  errorEvent: boolean = false

  value3: string;

  constructor(public auth: AuthService, public http: HttpClient, private router: Router, private cookieService: CookieService) { 
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)])
    })
    
  }

  async submit(){
    if(this.form.invalid){
      return
    }
    
    const user = {
      email: this.form.value.username,
      password: this.form.value.password,
    }
    console.log(user)
    let result = await this.auth.Auth(user)
    console.log(result)
    if (result.error) {
      this.errorEvent = true
      this.errMessage = result.error
      return
    }

    localStorage.setItem('role', result.role);
    localStorage.setItem('token', result.token);
    localStorage.setItem('email', result.email);
    window.location.href = "/"
   }

}
