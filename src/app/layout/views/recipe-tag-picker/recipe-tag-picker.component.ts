import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecipeTag } from 'src/app/entities/recipe-tag.model';
import { RecipeTagService } from 'src/app/service/recipe-tag.service';

type EntityArrayResponseType = HttpResponse<IRecipeTag[]>;

@Component({
  selector: 'app-recipe-tag-picker',
  templateUrl: './recipe-tag-picker.component.html',
  styleUrls: ['./recipe-tag-picker.component.scss'],
})
export class RecipeTagPickerComponent implements OnInit {
  tagList$: Observable<EntityArrayResponseType>;
  constructor(private service: RecipeTagService) {}

  ngOnInit(): void {
    this.tagList$ = this.service.queryAll();
  }
}
