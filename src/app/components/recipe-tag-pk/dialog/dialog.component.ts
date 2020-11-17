import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IRecipeTag } from 'src/app/entities/recipe-tag.model';
import { DialogData } from '../recipe-tag-pk.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  searchText = '';
  options: IRecipeTag[];
  selections: IRecipeTag[];

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.selections = this.data.selections;
    this.options = this._filterSelections(this.data.options);
  }

  addTag(rt: IRecipeTag): void {
    this.selections.push(rt);
    this.options = this._filterSelections(this.options);
  }

  private _filterSelections(data: IRecipeTag[]): IRecipeTag[] {
    const duplicates = this._getDuplicates(data);
    return data.filter((x) => {
      for (const dup of duplicates) {
        if (dup.id === x.id) {
          return false;
        }
      }
      return true;
    });
  }

  private _getDuplicates(data: IRecipeTag[]): IRecipeTag[] {
    const lookup = data.concat(this.selections).reduce((a, e) => {
      if (e.id !== undefined) {
        a[e.id] = ++a[e.id] || 0;
      }
      return a;
    }, {});
    return data.filter((e) => {
      if (e.id !== undefined) {
        return lookup[e.id];
      }
    });
  }
}
