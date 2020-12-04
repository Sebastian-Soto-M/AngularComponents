import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICartIngredient } from 'src/app/entities/cart-ingredient.model';
import { CurrentCartService } from 'src/app/service/current-cart.service';

@Component({
  selector: 'app-remove-ingredient',
  templateUrl: './remove-ingredient.component.html',
  styleUrls: ['./remove-ingredient.component.scss'],
})
export class RemoveIngredientComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ICartIngredient,
    public service: CurrentCartService
  ) {}

  ngOnInit(): void {}
}
