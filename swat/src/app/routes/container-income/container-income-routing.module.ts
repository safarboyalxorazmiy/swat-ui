import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerIncomeComponent } from './container-income.component';

const routes: Routes = [{ path: '', component: ContainerIncomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContainerIncomeRoutingModule { }
