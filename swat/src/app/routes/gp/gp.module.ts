import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GpRoutingModule } from './gp-routing.module';
import { GpComponent } from './gp.component';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GpComponent
  ],
  imports: [
    CommonModule,
    GpRoutingModule,
    FormsModule,
    DropdownModule
  ]
})
export class GpModule { }
