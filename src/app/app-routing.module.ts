import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IngredientPickerComponent } from './components/ingredient-picker/ingredient-picker.component';
import { RecipeTagPickerComponent } from './components/recipe-tag-picker/recipe-tag-picker.component';
import { HomeComponent } from './layout/views/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ingredient-picker', component: IngredientPickerComponent },
  { path: 'recipe-tag-picker', component: RecipeTagPickerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
