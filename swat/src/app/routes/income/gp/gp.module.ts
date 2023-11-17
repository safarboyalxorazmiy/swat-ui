import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { GpRoutingModule } from './gp-routing.module';
import { GpComponent } from './gp.component';

import {InputTextModule} from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import { ToolbarModule } from 'primeng/toolbar';



@NgModule({
  declarations: [
    GpComponent
  ],
  imports: [
    CommonModule,
    GpRoutingModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    TableModule,
    CalendarModule,
    ToolbarModule
  ],
  providers: [DatePipe]

})
export class GpModule { }
