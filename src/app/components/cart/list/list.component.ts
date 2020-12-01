import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICartIngredient } from 'src/app/entities/cart-ingredient.model';
import { CurrentCartService } from 'src/app/service/current-cart.service';
import { InfoComponent } from '../dialog/info/info.component';
import { RemoveComponent } from '../dialog/remove/remove.component';

@Component({
  selector: 'app-cart-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(public dialog: MatDialog, public service: CurrentCartService) {}

  ngOnInit(): void {}

  delete(item: ICartIngredient) {
    const dialogRef = this.dialog.open(RemoveComponent, {
      data: item,
    });
    dialogRef.afterClosed();
  }

  info(i: number) {
    const dialogRef = this.dialog.open(InfoComponent, {
      data: {
        title: i,
      },
    });
    dialogRef.afterClosed();
  }

  toggle(i: number) {
    this.service.toggleStatus(i);
  }
}
