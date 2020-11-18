import { Component, OnInit, ViewChild } from '@angular/core';
import { RecipeTagPickerComponent } from 'src/app/components/recipe-tag-picker/recipe-tag-picker.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('recipePk') recipePicker!: RecipeTagPickerComponent;

  constructor() {}

  ngOnInit(): void {}
}
