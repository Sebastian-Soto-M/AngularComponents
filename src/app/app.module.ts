// Material
import { AppMaterialModule } from './app-material.module';

// Basic imports
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BasePickerComponent } from './components/base-picker/base-picker.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';

// UI Base Components

// Base Picker
import { ChipsComponent as BasePickerChipsComponent } from './components/base-picker/chips/chips.component';
import { DialogComponent as BasePickerDialogComponent } from './components/base-picker/dialog/dialog.component';
import { ListComponent as BasePickerListComponent } from './components/base-picker/list/list.component';
import { PanelComponent as BasePickerPanelComponent } from './components/base-picker/panel/panel.component';

// Ingredient Picker
import { DialogComponent as IngredientPickerDialogComponent } from './components/ingredient-picker/dialog/dialog.component';
import { ListComponent as IngredientPickerListComponent } from './components/ingredient-picker/list/list.component';
import { PanelComponent as IngredientPickerPanelComponent } from './components/ingredient-picker/panel/panel.component';
import { SelectionComponent as IngredientPickerSelectionComponent } from './components/ingredient-picker/selection/selection.component';
import { SelectionListComponent as IngredientPickerSelectionListComponent } from './components/ingredient-picker/selection-list/selection-list.component';

// Cart
import { CartComponent } from './components/cart/cart.component';
import { ListComponent as CartIngredientListComponent } from './components/cart/list/list.component';
import { AddIngredientsComponent as CartAddIngredientsComponent } from './components/cart/dialog/add-ingredients/add-ingredients.component';
import { InfoIngredientComponent as CartIngredientInfoComponent } from './components/cart/dialog/info-ingredient/info-ingredient.component';
import { RemoveIngredientComponent as CartIngredientRemoveComponent } from './components/cart/dialog/remove-ingredient/remove-ingredient.component';

// UI Components
import { IngredientPickerComponent } from './components/ingredient-picker/ingredient-picker.component';
import { IngredientTagPickerComponent } from './components/ingredient-tag-picker/ingredient-tag-picker.component';
import { RecipeTagPickerComponent } from './components/recipe-tag-picker/recipe-tag-picker.component';

// Pipes
import { IngredientFilterPipe } from './util/ingredient-filter.pipe';
import { TagFilterPipe } from './util/tag-filter.pipe';

// Services
import { RecipeTagService } from './service/recipe-tag.service';
import { IngredientPickerFormService } from './components/ingredient-picker/ingredient-picker-form.service';
import { IngredientService } from './service/ingredient.service';

// Navigation
import { HomeComponent } from './layout/views/home/home.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { PickersComponent } from './layout/views/pickers/pickers.component';
import { CartHasIngredientService } from './service/cart-has-ingredient.service';
import { CartService } from './service/cart.service';
import { CartIngredientService } from './service/cart-ingredient.service';
import { CurrentCartService } from './service/current-cart.service';
import { CartHasRecipeService } from './service/cart-has-recipe.service';
import { TestsComponent } from './layout/views/tests/tests.component';
import { ItemComponent as CartIngredientListItemComponent } from './components/cart/list/item/item.component';

@NgModule({
  declarations: [
    AppComponent,
    BasePickerChipsComponent,
    BasePickerComponent,
    BasePickerDialogComponent,
    BasePickerListComponent,
    BasePickerPanelComponent,

    CartComponent,
    CartAddIngredientsComponent,
    CartIngredientInfoComponent,
    CartIngredientListComponent,
    CartIngredientRemoveComponent,

    HomeComponent,

    IngredientPickerComponent,
    IngredientPickerDialogComponent,
    IngredientPickerListComponent,
    IngredientPickerPanelComponent,
    IngredientPickerSelectionComponent,
    IngredientPickerSelectionListComponent,
    IngredientTagPickerComponent,

    NavigationComponent,
    PickersComponent,
    RecipeTagPickerComponent,

    IngredientFilterPipe,
    TagFilterPipe,
    TestsComponent,
    CartIngredientListItemComponent,
  ],
  imports: [
    AppMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    CartAddIngredientsComponent,
    CartIngredientInfoComponent,
    CartIngredientRemoveComponent,
  ],
  providers: [
    CartHasIngredientService,
    CartIngredientService,
    CartHasRecipeService,
    CartService,
    CurrentCartService,
    IngredientPickerFormService,
    IngredientService,
    RecipeTagService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
