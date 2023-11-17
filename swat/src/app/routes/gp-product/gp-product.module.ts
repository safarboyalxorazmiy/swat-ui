import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GpProductRoutingModule } from './gp-product-routing.module';
import { GpProductComponent } from './gp-product.component';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';



@NgModule({
  declarations: [
    GpProductComponent
  ],
  imports: [
    CommonModule,
    GpProductRoutingModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
    TableModule
  ]
})
export class GpProductModule { }
