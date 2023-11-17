import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BomRoutingModule } from './bom-routing.module';
import { BomComponent } from './bom.component';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

@NgModule({
  declarations: [
    BomComponent
  ],
  imports: [
    CommonModule,
    BomRoutingModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    TableModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService]

})
export class BomModule { }
