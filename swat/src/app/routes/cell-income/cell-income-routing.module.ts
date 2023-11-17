import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CellIncomeComponent } from './cell-income.component';

const routes: Routes = [{ path: '', component: CellIncomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CellIncomeRoutingModule { }
