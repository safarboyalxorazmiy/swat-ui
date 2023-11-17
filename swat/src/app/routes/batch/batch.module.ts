import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatchRoutingModule } from './batch-routing.module';
import { BatchComponent } from './batch.component';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [
    BatchComponent
  ],
  imports: [
    CommonModule,
    BatchRoutingModule,
    TableModule,
    InputTextModule,
    FormsModule,
    ButtonModule
  ],
})
export class BatchModule { }
