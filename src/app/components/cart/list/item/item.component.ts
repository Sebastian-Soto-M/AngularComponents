import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICartIngredient } from 'src/app/entities/cart-ingredient.model';
import { CurrentCartService } from 'src/app/service/current-cart.service';
import { InfoIngredientComponent } from '../../dialog/info-ingredient/info-ingredient.component';
import { RemoveIngredientComponent } from '../../dialog/remove-ingredient/remove-ingredient.component';

@Component({
  selector: 'app-cart-list-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() ci!: ICartIngredient;
  @Output() itemToggled = new EventEmitter<ICartIngredient>();
  isAvailable: boolean;

  constructor(private dialog: MatDialog, private service: CurrentCartService) {}

  ngOnInit(): void {
    this.isAvailable = !(this.ci.cartHasIngredientId > 0);
  }

  delete(): void {
    const dialogRef = this.dialog.open(RemoveIngredientComponent, {
      width: '300px',
      maxWidth: '400px',
      data: this.ci,
    });
    dialogRef.afterClosed().subscribe((response) => {
      if (response) this.service.deleteCartIngredient(response);
    });
  }

  info(): void {
    const dialogRef = this.dialog.open(InfoIngredientComponent, {
      data: this.ci,
    });
  }

  toggle(): void {
    this.service.toggleCartIngredientStatus(this.ci);
    this.itemToggled.emit(this.ci);
  }
}
