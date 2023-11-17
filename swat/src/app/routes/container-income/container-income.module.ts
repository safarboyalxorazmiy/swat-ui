import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerIncomeRoutingModule } from './container-income-routing.module';
import { ContainerIncomeComponent } from './container-income.component';

import {ButtonModule} from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';



@NgModule({
  declarations: [
    ContainerIncomeComponent
  ],
  imports: [
    CommonModule,
    ContainerIncomeRoutingModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    TableModule,
    DropdownModule,
    InputNumberModule
  ]
})
export class ContainerIncomeModule { }
