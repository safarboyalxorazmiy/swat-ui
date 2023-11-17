import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup
  submitted: boolean = false
  errMessage: string
  errorEvent: boolean = false
  email: string | null
  role: string | null
  token: string | null

  value3: string;

  createdEvent: boolean = false

  constructor(public auth: AuthService, public http: HttpClient) { 
  }

  ngOnInit(): void {
    this.email = localStorage.getItem("email")
    this.role = localStorage.getItem("role")
    this.token = localStorage.getItem("token")

    // if (this.role != "admin"){
    //   sessionStorage.clear()
    //   location.reload()
    //   window.location.href = "/"
    // }

    this.form = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)])
    })
    
  }

  async submit(){
    this.createdEvent = false
    if(this.form.invalid){
      return
    }
    
    const user = {
      regemail: this.form.value.username,
      regpassword: this.form.value.password,
      token: this.token,
      email: this.email,
      role: this.role

    }
    console.log(user)
    // let result = await this.auth.Register(user)
  //   if (result.error) {
  //     this.errorEvent = true
  //     this.errMessage = result.error
  //     return
  //   }
  //   this.errorEvent = false
  //   console.log(result)
  //   this.form.reset()
  //   this.createdEvent = true
    
   }
}
