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
    this.options = this.data.options;
    this.selections = this.data.selections;
  }

  addTag(rt: IRecipeTag): void {
    console.log(rt);
  }

  exit(): void {
    this.dialogRef.close();
  }
}
