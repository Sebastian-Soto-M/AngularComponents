import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AddressComponent } from './layout/form/address/address.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './components/recipe-tag-pk/dialog/dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './layout/views/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { IngredientTagPickerComponent } from './layout/views/ingredient-tag-picker/ingredient-tag-picker.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { RecipeTagPickerComponent } from './layout/views/recipe-tag-picker/recipe-tag-picker.component';
import { RecipeTagPkComponent } from './components/recipe-tag-pk/recipe-tag-pk.component';
import { RecipeTagService } from './service/recipe-tag.service';
import { TagFilterPipe } from './util/tag-filter.pipe';

@NgModule({
  declarations: [
    AddressComponent,
    AppComponent,
    DialogComponent,
    HomeComponent,
    IngredientTagPickerComponent,
    NavigationComponent,
    RecipeTagPickerComponent,
    RecipeTagPkComponent,
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
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatInputModule,
    MatListModule,
    MatRadioModule,
    MatChipsModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    ReactiveFormsModule,
  ],
  providers: [RecipeTagService],
  bootstrap: [AppComponent],
})
export class AppModule {}
