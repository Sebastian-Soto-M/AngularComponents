import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BasePickerComponent } from 'src/app/components/base-picker/base-picker.component';
import { IRecipeTag } from 'src/app/entities/recipe-tag.model';
import { RecipeTagService } from 'src/app/service/recipe-tag.service';

@Component({
  selector: 'app-recipe-tag-picker',
  templateUrl: './recipe-tag-picker.component.html',
  styleUrls: ['./recipe-tag-picker.component.scss'],
})
export class RecipeTagPickerComponent implements OnInit {
  reloadTagList$ = new BehaviorSubject<boolean>(true);
  tags: IRecipeTag[];
  recipeTags: IRecipeTag[];
  @ViewChild('basePicker') basePicker!: BasePickerComponent;

  constructor(public service: RecipeTagService) {}

  ngOnInit() {
    this.reloadTagList$.subscribe((_) => {
      this.service.queryAll().subscribe((response: any) => {
        this.tags = response.body.sort((a: IRecipeTag, b: IRecipeTag) =>
          a.typeId > b.typeId ? 1 : -1
        );
      });
    });
  }

  getRecipeTags(): IRecipeTag[] {
    return this.basePicker.selections;
  }
}
