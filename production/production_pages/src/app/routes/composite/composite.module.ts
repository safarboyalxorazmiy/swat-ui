import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompositeRoutingModule } from './composite-routing.module';
import { CompositeComponent } from './composite.component';
import { FormsModule } from '@angular/forms';

import {TableModule} from 'primeng/table';

@NgModule({
  declarations: [
    CompositeComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    CompositeRoutingModule,
    TableModule
  ]
})

export class CompositeModule {}
