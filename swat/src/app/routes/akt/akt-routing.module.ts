import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AktComponent } from './akt.component';

const routes: Routes = [{ path: '', component: AktComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AktRoutingModule { }
