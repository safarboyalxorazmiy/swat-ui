import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GpProductComponent } from './gp-product.component';

const routes: Routes = [{ path: '', component: GpProductComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GpProductRoutingModule { }
