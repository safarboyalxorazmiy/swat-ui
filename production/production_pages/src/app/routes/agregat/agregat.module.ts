import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgregatRoutingModule } from './agregat-routing.module';
import { AgregatComponent } from './agregat.component';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import {ToolbarModule} from 'primeng/toolbar';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    AgregatComponent
  ],
  imports: [
    CommonModule,
    AgregatRoutingModule,
    FormsModule,
    ToolbarModule,
    TableModule,
    InputTextModule
  ]
})
export class AgregatModule { }
