import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckpointsComponent } from './checkpoints.component';

const routes: Routes = [{ path: '', component: CheckpointsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckpointsRoutingModule { }
