import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './layout/views/home/home.component';
import { IngredientTagPickerComponent } from './layout/views/ingredient-tag-picker/ingredient-tag-picker.component';
import { RecipeTagPickerComponent } from './layout/views/recipe-tag-picker/recipe-tag-picker.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recipe-tag-picker', component: RecipeTagPickerComponent },
  { path: 'ingredient-tag-picker', component: IngredientTagPickerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
