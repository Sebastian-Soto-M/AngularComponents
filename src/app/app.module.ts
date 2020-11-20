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
import { ChipsComponent as BasePickerChipsComponent } from './components/base-picker/chips/chips.component';
import { DialogComponent as BasePickerDialogComponent } from './components/base-picker/dialog/dialog.component';
import { DialogComponent as IngredientPickerDialogComponent } from './components/ingredient-picker/dialog/dialog.component';
import { ListComponent as BasePickerListComponent } from './components/base-picker/list/list.component';
import { ListComponent as IngredientPickerListComponent } from './components/ingredient-picker/list/list.component';
import { PanelComponent as BasePickerPanelComponent } from './components/base-picker/panel/panel.component';
import { PanelComponent as IngredientPickerPanelComponent } from './components/ingredient-picker/panel/panel.component';
import { SelectionComponent as IngredientPickerSelectionComponent } from './components/ingredient-picker/selection/selection.component';
import { SelectionListComponent as IngredientSelectionListComponent } from './components/ingredient-picker/selection-list/selection-list.component';

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

// Angular material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

// Navigation
import { HomeComponent } from './layout/views/home/home.component';
import { NavigationComponent } from './layout/navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    BasePickerChipsComponent,
    BasePickerComponent,
    BasePickerDialogComponent,
    BasePickerListComponent,
    BasePickerPanelComponent,
    HomeComponent,
    IngredientFilterPipe,
    IngredientPickerComponent,
    IngredientPickerDialogComponent,
    IngredientPickerListComponent,
    IngredientPickerPanelComponent,
    IngredientPickerSelectionComponent,
    IngredientSelectionListComponent,
    IngredientTagPickerComponent,
    NavigationComponent,
    RecipeTagPickerComponent,
    TagFilterPipe,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatInputModule,
    MatListModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule,
  ],
  providers: [RecipeTagService, IngredientService, IngredientPickerFormService],
  bootstrap: [AppComponent],
})
export class AppModule {}
