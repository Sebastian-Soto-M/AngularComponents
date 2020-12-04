import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICartIngredient } from 'src/app/entities/cart-ingredient.model';
import { CurrentCartService } from 'src/app/service/current-cart.service';

@Component({
  selector: 'app-remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.scss'],
})
export class RemoveComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ICartIngredient,
    public service: CurrentCartService
  ) {}

  ngOnInit(): void {}
}
