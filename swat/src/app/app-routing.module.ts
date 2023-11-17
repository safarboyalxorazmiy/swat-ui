import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{ path: 'components', loadChildren: () => import('./routes/components/components.module').then(m => m.ComponentsModule) }, 
{ path: 'checkpoints', loadChildren: () => import('./routes/checkpoints/checkpoints.module').then(m => m.CheckpointsModule) }, 
{ path: 'bom', loadChildren: () => import('./routes/bom/bom.module').then(m => m.BomModule) }, 
{ path: 'bom/:id',  loadChildren: () => import('./routes/bom/bom.module').then(m => m.BomModule) }, 
{ path: 'income', loadChildren: () => import('./routes/income/income.module').then(m => m.IncomeModule) }, 
{ path: 'outcome', loadChildren: () => import('./routes/outcome/outcome.module').then(m => m.OutcomeModule) },
{ path: 'bom/edit/:id', loadChildren: () => import('./routes/bom/edit/edit.module').then(m => m.EditModule) },
{ path: 'auth', loadChildren: () => import('./routes/auth/auth.module').then(m => m.AuthModule) },
{ path: 'income/gp', loadChildren: () => import('./routes/income/gp/gp.module').then(m => m.GpModule) },
{ path: 'register', loadChildren: () => import('./routes/register/register.module').then(m => m.RegisterModule) },
{ path: 'income/report', loadChildren: () => import('./routes/income/report/report.module').then(m => m.ReportModule) },
{ path: 'outcome/report', loadChildren: () => import('./routes/outcome/report/report.module').then(m => m.ReportModule) },
{ path: 'gs', loadChildren: () => import('./routes/gs/gs.module').then(m => m.GsModule) },
{ path: 'checkpoints/:id', loadChildren: () => import('./routes/checkpoints/edit/edit.module').then(m => m.EditModule) },
{ path: 'akt', loadChildren: () => import('./routes/akt/akt.module').then(m => m.AktModule) },
{ path: 'akt/report', loadChildren: () => import('./routes/akt/report/report.module').then(m => m.ReportModule) },
{ path: 'gp', loadChildren: () => import('./routes/gp-product/gp-product.module').then(m => m.GpProductModule) },
{ path: 'lots', loadChildren: () => import('./routes/lots/lots.module').then(m => m.LotsModule) },
{ path: 'lots/:id', loadChildren: () => import('./routes/batch/batch.module').then(m => m.BatchModule) },
{ path: 'lots/:lot_id/:batch_id', loadChildren: () => import('./routes/container/container.module').then(m => m.ContainerModule) },
{ path: 'lots/:lot_id/:batch_id/:container_id', loadChildren: () => import('./routes/container-income/container-income.module').then(m => m.ContainerIncomeModule) },
{ path: 'cell_income', loadChildren: () => import('./routes/cell-income/cell-income.module').then(m => m.CellIncomeModule) },
{ path: 'plan', loadChildren: () => import('./routes/plan/plan.module').then(m => m.PlanModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
