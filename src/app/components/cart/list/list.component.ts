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
      width: '300px',
      maxWidth: '400px',
      data: item,
    });
    dialogRef.afterClosed().subscribe((response) => {
      if (response) this.remove(response);
    });
  }

  info(item: ICartIngredient) {
    const dialogRef = this.dialog.open(InfoComponent, {
      data: item,
    });
    dialogRef.afterClosed();
  }

  toggle(i: number) {
    this.service.toggleStatus(i);
  }

  remove(item: ICartIngredient): void {
    this.service.removeIngredient(item);
  }
}
