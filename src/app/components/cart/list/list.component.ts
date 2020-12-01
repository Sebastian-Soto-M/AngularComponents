import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICartIngredient } from 'src/app/entities/cart-ingredient.model';
import { CurrentCartService } from 'src/app/service/current-cart.service';
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

  constructor(public dialog: MatDialog, public service: CurrentCartService) {}

  ngOnInit(): void {}

  delete(item: ICartIngredient) {
    const dialogRef = this.dialog.open(RemoveComponent, {
      data: item,
    });
    dialogRef.afterClosed();
    this.itemUpdate.emit(item);
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
    console.warn(this.list[i].status);
    this.list[i].status =
      this.list[i].status.toUpperCase() === Status.PENDING.toUpperCase()
        ? Status.ACTIVE
        : Status.PENDING;
    this.itemUpdate.emit(this.list[i]);
  }
}
