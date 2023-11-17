import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PpuRoutingModule } from './ppu-routing.module';
import { PpuComponent } from './ppu.component';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import {ToolbarModule} from 'primeng/toolbar';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    PpuComponent
  ],
  imports: [
    CommonModule,
    PpuRoutingModule,
    FormsModule,
    ToolbarModule,
    TableModule,
    InputTextModule
  ]
})
export class PpuModule { }
