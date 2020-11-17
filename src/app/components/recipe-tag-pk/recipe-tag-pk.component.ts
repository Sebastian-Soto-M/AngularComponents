import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
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

  @ViewChild('panel') panel!: MatExpansionPanel;

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
    dialogRef.beforeClosed().subscribe((selections: IRecipeTag[]) => {
      if (selections !== undefined && selections.length !== 0) {
        this.selectionList = selections;
      } else {
        this.closePanel();
      }
    });
  }

  reload(): void {
    this.reloadTagList$.next(false);
  }

  remove(index: number): void {
    this.selectionList.splice(index, 1);
    if (this.selectionList.length === 0) {
      this.closePanel();
    }
  }

  checkSelections(): void {
    if (this.selectionList.length === 0) {
      this.closePanel();
      this.open();
    } else {
      this.panelOpenState = true;
    }
  }

  private closePanel(): void {
    this.panel.close();
    this.panelOpenState = false;
  }

  private openPanel(): void {
    this.panel.open();
    this.panelOpenState = true;
  }
}
