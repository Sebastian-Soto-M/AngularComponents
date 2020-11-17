import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { IRecipeTag } from 'src/app/entities/recipe-tag.model';
import { RecipeTagService } from 'src/app/service/recipe-tag.service';
import { DialogComponent } from './dialog/dialog.component';

export interface DialogData {
  options: IRecipeTag[];
  selections: IRecipeTag[];
}

@Component({
  selector: 'app-recipe-tag-pk',
  templateUrl: './recipe-tag-pk.component.html',
  styleUrls: ['./recipe-tag-pk.component.scss'],
})
export class RecipeTagPkComponent implements OnInit {
  reloadTagList$ = new BehaviorSubject<boolean>(true);
  tagList$: IRecipeTag[];
  optionList: IRecipeTag[];
  selectionList: IRecipeTag[] = [];

  panelOpenState = false;

  constructor(public dialog: MatDialog, private service: RecipeTagService) {}

  ngOnInit() {
    this.reloadTagList$.subscribe((_) => {
      this.service.queryAll().subscribe((response) => {
        this.tagList$ = response.body.sort((a, b) =>
          a.typeId > b.typeId ? 1 : -1
        );
        this.optionList = this.tagList$;
      });
    });
  }

  open() {
    const dialogRef = this.dialog.open(DialogComponent, {
      minWidth: '60%',
      data: {
        options: this.optionList,
        selections: this.selectionList,
      },
    });
    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        console.warn(this.selectionList);
      } else {
        console.warn('there are no selections');
      }
    });
  }

  reload(): void {
    this.reloadTagList$.next(false);
  }
}
