import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditRoutingModule } from './edit-routing.module';
import { EditComponent } from './edit.component';

import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';




@NgModule({
  declarations: [
    EditComponent
  ],
  imports: [
    CommonModule,
    EditRoutingModule,
    TableModule, 
    ToastModule,
    FormsModule,
    ButtonModule,
    InputNumberModule
  ]
})
export class EditModule { }
