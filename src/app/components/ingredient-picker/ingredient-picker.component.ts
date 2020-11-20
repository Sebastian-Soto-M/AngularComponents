import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IIngredient } from 'src/app/entities/ingredient.model';
import { IngredientService } from 'src/app/service/ingredient.service';

@Component({
  selector: 'app-ingredient-picker',
  templateUrl: './ingredient-picker.component.html',
  styleUrls: ['./ingredient-picker.component.scss'],
})
export class IngredientPickerComponent implements OnInit {
  reloadTagList$ = new BehaviorSubject<boolean>(true);
  ingredients: IIngredient[];
  selections: any[];

  constructor(public service: IngredientService) {}

  ngOnInit(): void {
    this.reloadTagList$.subscribe((_) => {
      this.service
        .query({
          ...{ 'status.equals': 'ACTIVE' },
        })
        .subscribe((response: any) => {
          this.ingredients = response.body.sort(
            (a: IIngredient, b: IIngredient) => {
              return a.id > b.id ? 1 : -1;
            }
          );
        });
    });
  }

  getIngredients(): IIngredient[] {
    return this.selections;
  }
}
