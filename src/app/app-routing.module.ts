import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './layout/views/home/home.component';
import { PickersComponent } from './layout/views/pickers/pickers.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pickers', component: PickersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
