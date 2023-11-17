import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LotsRoutingModule } from './lots-routing.module';
import { LotsComponent } from './lots.component';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';




@NgModule({
  declarations: [
    LotsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LotsRoutingModule,
    TableModule,
    InputTextModule,
    ButtonModule

  ]
})
export class LotsModule { }
