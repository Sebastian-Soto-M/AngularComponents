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
  initialSelections: IRecipeTag[];
  newSelections: IRecipeTag[];

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.newSelections = [];
    this.initialSelections = this.data.selections;
    this.options = this._filterSelections(
      this.data.options,
      this.initialSelections
    );
  }

  addTag(rt: IRecipeTag): void {
    this.newSelections.push(rt);
    this.options = this._filterSelections(this.options, this.newSelections);
  }

  private _filterSelections(a: IRecipeTag[], b: IRecipeTag[]): IRecipeTag[] {
    const duplicates = this._getDuplicates(a, b);
    return a.filter((x) => {
      for (const dup of duplicates) {
        if (dup.id === x.id) {
          return false;
        }
      }
      return true;
    });
  }

  private _getDuplicates(a: IRecipeTag[], b: IRecipeTag[]): IRecipeTag[] {
    const lookup = a.concat(b).reduce((c, d) => {
      if (d.id !== undefined) {
        c[d.id] = ++c[d.id] || 0;
      }
      return c;
    }, {});
    return a.filter((e) => {
      if (e.id !== undefined) {
        return lookup[e.id];
      }
    });
  }

  protected getSelections() {
    return this.initialSelections.concat(this.newSelections);
  }
}
