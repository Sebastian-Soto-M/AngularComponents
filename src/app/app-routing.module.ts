import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './layout/views/home/home.component';
import { PickersComponent } from './layout/views/pickers/pickers.component';
import { TestsComponent } from './layout/views/tests/tests.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pickers', component: PickersComponent },
  { path: 'tests', component: TestsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
