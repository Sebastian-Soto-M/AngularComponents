import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AddressComponent } from './layout/form/address/address.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BasePickerComponent } from './components/base-picker/base-picker.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChipsComponent as BasePickerChipsComponent } from './components/base-picker/chips/chips.component';
import { DialogComponent as BasePickerDialogComponent } from './components/base-picker/dialog/dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './layout/views/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { IngredientTagPickerComponent } from './components/ingredient-tag-picker/ingredient-tag-picker.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ListComponent as BasePickerListComponent } from './components/base-picker/list/list.component';
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
import { NavigationComponent } from './layout/navigation/navigation.component';
import { PanelComponent as BasePickerPanelComponent } from './components/base-picker/panel/panel.component';
import { RecipeTagPickerComponent } from './components/recipe-tag-picker/recipe-tag-picker.component';
import { RecipeTagService } from './service/recipe-tag.service';
import { TagFilterPipe } from './util/tag-filter.pipe';

@NgModule({
  declarations: [
    AddressComponent,
    AppComponent,
    BasePickerChipsComponent,
    BasePickerComponent,
    BasePickerDialogComponent,
    BasePickerListComponent,
    BasePickerPanelComponent,
    HomeComponent,
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
    ReactiveFormsModule,
  ],
  providers: [RecipeTagService],
  bootstrap: [AppComponent],
})
export class AppModule {}
