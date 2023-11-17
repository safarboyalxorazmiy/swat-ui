import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import {ToastModule} from 'primeng/toast';
import { MessageModule } from 'primeng/message';

@NgModule({
  declarations: [
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    DividerModule,
    ReactiveFormsModule,
    ToastModule,
    MessageModule,
  ],
  providers: []
})
export class RegisterModule { }
