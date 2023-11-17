import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GsRoutingModule } from './gs-routing.module';
import { GsComponent } from './gs.component';
import { FormsModule } from '@angular/forms';
import {FileUploadModule} from 'primeng/fileupload';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';




@NgModule({
  declarations: [
    GsComponent
  ],
  imports: [
    CommonModule,
    GsRoutingModule,
    FormsModule,
    FileUploadModule,
    DropdownModule,
    TableModule
  ]
})
export class GsModule { }
