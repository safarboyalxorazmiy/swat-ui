import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CellIncomeRoutingModule } from './cell-income-routing.module';
import { CellIncomeComponent } from './cell-income.component';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import {InputNumberModule} from 'primeng/inputnumber';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';





@NgModule({
  declarations: [
    CellIncomeComponent
  ],
  imports: [
    CommonModule,
    CellIncomeRoutingModule,
    DropdownModule,
    FormsModule,
    InputNumberModule,
    ButtonModule,
    TableModule
  ]
})
export class CellIncomeModule { }
