import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AktRoutingModule } from './akt-routing.module';
import { AktComponent } from './akt.component';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {FileUploadModule} from 'primeng/fileupload';




@NgModule({
  declarations: [
    AktComponent
  ],
  imports: [
    CommonModule,
    AktRoutingModule,
    DropdownModule,
    FormsModule,
    InputNumberModule,
    InputTextModule,
    ButtonModule,
    FileUploadModule
  ]
})
export class AktModule { }
