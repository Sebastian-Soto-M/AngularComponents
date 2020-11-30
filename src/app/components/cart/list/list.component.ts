import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICartIngredient } from 'src/app/entities/cart-ingredient.model';
import { Status } from 'src/app/status.enum';
import { InfoComponent } from '../dialog/info/info.component';
import { RemoveComponent } from '../dialog/remove/remove.component';

@Component({
  selector: 'app-cart-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() list!: ICartIngredient[];
  @Output() itemUpdate = new EventEmitter<ICartIngredient>();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  delete(i: number) {
    const dialogRef = this.dialog.open(RemoveComponent, {
      data: {
        title: 'HI',
      },
    });
    dialogRef.afterClosed();
    this.itemUpdate.emit(this.list[i]);
  }

  info(i: number) {
    const dialogRef = this.dialog.open(InfoComponent, {
      data: {
        title: 'HI',
      },
    });
    dialogRef.afterClosed();
  }

  toggle(i: number) {
    this.list[i].status =
      this.list[i].status === Status.PENDING ? Status.ACTIVE : Status.PENDING;
    this.itemUpdate.emit(this.list[i]);
  }

  //TODO create a pipe to toggle the selected items view on the list.
}
