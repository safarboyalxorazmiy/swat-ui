import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GpComponent } from './gp.component';

const routes: Routes = [{ path: '', component: GpComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GpRoutingModule { }
