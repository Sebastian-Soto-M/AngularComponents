import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IIngredientTag } from 'src/app/entities/ingredient-tag.model';
import { IngredientTagService } from 'src/app/service/ingredient-tag.service';
import { BasePickerComponent } from '../base-picker/base-picker.component';

@Component({
  selector: 'app-ingredient-tag-picker',
  templateUrl: './ingredient-tag-picker.component.html',
  styleUrls: ['./ingredient-tag-picker.component.scss'],
})
export class IngredientTagPickerComponent implements OnInit {
  reloadTagList$ = new BehaviorSubject<boolean>(true);
  tags: IIngredientTag[];
  recipeTags: IIngredientTag[];
  @ViewChild('basePicker') basePicker!: BasePickerComponent;

  constructor(public service: IngredientTagService) {}

  ngOnInit() {
    this.reloadTagList$.subscribe((_) => {
      this.service.queryAll().subscribe((response: any) => {
        this.tags = response.body.sort(
          (a: IIngredientTag, b: IIngredientTag) => {
            if (a.typeId !== undefined && b.typeId !== undefined)
              return a.typeId > b.typeId ? 1 : -1;
            return -1;
          }
        );
      });
    });
  }

  getIngredientTags(): IIngredientTag[] {
    return this.basePicker.selections;
  }
}
