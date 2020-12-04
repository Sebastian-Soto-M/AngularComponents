import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICartIngredient } from 'src/app/entities/cart-ingredient.model';
import { CartIngredientService } from 'src/app/service/cart-ingredient.service';
import { RemoveIngredientComponent } from '../../dialog/remove-ingredient/remove-ingredient.component';

@Component({
  selector: 'app-cart-list-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() ci!: ICartIngredient;

  constructor(
    private dialog: MatDialog,
    private ciService: CartIngredientService
  ) {}

  ngOnInit(): void {}

  delete(): void {
    const dialogRef = this.dialog.open(RemoveIngredientComponent, {
      width: '300px',
      maxWidth: '400px',
      data: this.ci,
    });
    dialogRef.afterClosed().subscribe((response) => {
      if (response) console.error('Remove item...');
    });
  }

  info(): void {}

  toggle(): void {}
}
