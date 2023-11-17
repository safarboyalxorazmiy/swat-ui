import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BomComponent } from './bom.component';

const routes: Routes = [{ path: '', component: BomComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BomRoutingModule { }
