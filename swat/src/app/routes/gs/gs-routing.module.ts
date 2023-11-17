import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GsComponent } from './gs.component';

const routes: Routes = [{ path: '', component: GsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GsRoutingModule { }
